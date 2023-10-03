/////////////////////////////////////////////////
// MODEL of the MVC architecture
//
// Description: Fetches data from and posts data to the API
/////////////////////////////////////////////////

import { OPTIONS, BASE_URL, BASE_URL_IMAGE, IMG_SIZE, MOST_POPULAR_GENRES } from "./config.js";

/////////////////////////////////////////////////
///////// Represents the state of the system

export const state = {
  movieGenresInfo: [],
  tvsGenresInfo: [],

  mostPopularMoviesInfo: [], // [{ mostPopularMovies: [{...}, {...}, ...], page: _}, { ... }, ...]
  movieSpotlightInfo: [], // [{ id: _, title: '', releaseDate: '', ... }, ...]

  topRatedMoviesInfo: [],
  moviesByGenreInfo: [],
  movieTracksInfo: [],
};

/////////////////////////////////////////////////
///////// Helper functions

export const getMovieGenresStr = function (movieGenresId) {
  const movieGenresStr = [];
  let counter = 0;

  state.movieGenresInfo.every((movieGenre) => {
    if (movieGenresId.some((genreId) => genreId === movieGenre.id)) {
      movieGenresStr.push(movieGenre.name);
      counter++;
    }

    if (counter === movieGenresId.length) return false;

    return true;
  });

  return movieGenresStr;
};

export const getMovieGenresId = function (movieGenresStr) {
  const movieGenresId = [];
  let counter = 0;

  state.movieGenresInfo.every((movieGenre) => {
    if (movieGenresStr.some((genreStr) => genreStr.toLowerCase() === movieGenre.name.toLowerCase())) {
      movieGenresId.push(movieGenre.id);
      counter++;
    }

    if (counter === movieGenresStr.length) return false;

    return true;
  });

  return movieGenresId;
};

const getMoviesByGenreURL = function (genreId) {
  return `${BASE_URL}/discover/movie`
    .concat(`?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`)
    .concat(`&with_genres=${genreId}`);
};

/////////////////////////////////////////////////
///////// Fetches movie genres

export const fetchMovieGenres = async function () {
  if (state.movieGenresInfo.length !== 0) return;

  try {
    const response = await fetch(`${BASE_URL}/genre/movie/list?language=en`, OPTIONS);
    const { genres } = await response.json();

    state.movieGenresInfo = genres;
  } catch (err) {
    console.error(`(model.js::fetchMovieGenres()) ${err}`);
    throw err;
  }
};

/////////////////////////////////////////////////
///////// Fetches most popular movies

export const fetchMostPopularMovies = async function (page) {
  if (state.mostPopularMoviesInfo.length !== 0) return;

  try {
    const response = await fetch(`${BASE_URL}/movie/popular/?language=en-US&page=${page}`, OPTIONS);
    const mostPopularMovies = await response.json();

    state.mostPopularMoviesInfo.push({
      mostPopularMovies: mostPopularMovies.results,
      page: mostPopularMovies.page,
    });
  } catch (err) {
    console.error(`(model.js::fetchPopularMovies()) ${err}`);
    throw err;
  }
};

/////////////////////////////////////////////////
///////// Fetches top rated movies

export const fetchTopRatedMovies = async function (page) {
  if (state.topRatedMoviesInfo.length !== 0) return;

  try {
    const response = await fetch(`${BASE_URL}/movie/top_rated?language=en-US&page=${page}`, OPTIONS);
    const topRatedMovies = await response.json();

    state.topRatedMoviesInfo.push({
      topRatedMovies: topRatedMovies.results,
      page: topRatedMovies.page,
    });
  } catch (err) {
    console.error(`(model.js::fetchTopRatedMovies()) ${err}`);
    throw err;
  }
};

/////////////////////////////////////////////////
///////// Fetches movies by genre

export const fetchMoviesByGenre = async function () {
  if (state.moviesByGenreInfo.length !== 0) return;

  const movieGenresId = getMovieGenresId(MOST_POPULAR_GENRES);

  try {
    const response = await Promise.all([
      fetch(getMoviesByGenreURL(movieGenresId[0]), OPTIONS),
      fetch(getMoviesByGenreURL(movieGenresId[1]), OPTIONS),
      fetch(getMoviesByGenreURL(movieGenresId[2]), OPTIONS),
      fetch(getMoviesByGenreURL(movieGenresId[3]), OPTIONS),
    ]);

    const moviesByGenre = await Promise.all([
      response[0].json(),
      response[1].json(),
      response[2].json(),
      response[3].json(),
    ]);

    console.log(moviesByGenre);

    moviesByGenre.forEach((result, index) => {
      state.moviesByGenreInfo.push({
        genreId: movieGenresId[index],
        results: {
          page: result.page,
          movies: result.results,
        },
      });
    });
    // let response = await fetch(
    //   `${BASE_URL}/discover/movie`
    //     .concat(`?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`)
    //     .concat(`&with_genres=${movieGenresId[0]}`),
    //   OPTIONS
    // );
    // let moviesByGenre = await response.json();

    // state.moviesByGenreInfo.push({
    //   genreId: movieGenresId[0],
    //   results: {
    //     page: moviesByGenre.page,
    //     movies: moviesByGenre.results,
    //   },
    // });

    // movieGenresId.forEach(async function (genreId) {
    //   let response = await fetch(
    //     `${BASE_URL}/discover/movie`
    //       .concat(`?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`)
    //       .concat(`&with_genres=${genreId}`),
    //     OPTIONS
    //   );
    //   let moviesByGenre = await response.json();

    //   state.moviesByGenreInfo.push({
    //     genreId: genreId,
    //     results: {
    //       page: moviesByGenre.page,
    //       movies: moviesByGenre.results,
    //     },
    //   });
    // });
  } catch (err) {
    console.error(`(model.js::fetchMoviesByGenre()) ${err}`);
    throw err;
  }
};

/////////////////////////////////////////////////
///////// Determines which movies are in the
///////// spotlight (i.e. top 3 most popular)

export const determineMovieSpotlightContent = function () {
  if (state.mostPopularMoviesInfo.length === 0) return;

  const mostPopularMovies = state.mostPopularMoviesInfo[0].mostPopularMovies;

  // FIXME: Magic numbers
  for (let i = 0; i < 3 * 9; i += 9) {
    let entry = {};

    entry.id = mostPopularMovies[i].id;
    entry.title = mostPopularMovies[i].title;
    entry.releaseDate = mostPopularMovies[i].release_date;

    try {
      entry.genres = getMovieGenresStr(mostPopularMovies[i].genre_ids);
    } catch (err) {
      console.error(`(module.js::determineMovieSpotlight()) ${err}`);
      throw err;
    }

    entry.description = mostPopularMovies[i].overview;
    entry.rating = mostPopularMovies[i].vote_average;
    entry.backdropPath = `${BASE_URL_IMAGE}/${IMG_SIZE}${mostPopularMovies[i].backdrop_path}`;

    state.movieSpotlightInfo.push(entry);
  }
};

/////////////////////////////////////////////////
///////// Determines which movies are in each
///////// track

export const determineMovieTracksContent = function () {
  // state.movieTracksInfo = state.topRatedMoviesInfo[0].topRatedMovies.slice(0, 10);
  console.log(state.moviesByGenreInfo);
  // console.log(state.movieTracksInfo);
};

/////////////////////////////////////////////////
///////// Fetches TV show genres

// TODO: Use for TV portion
export const fetchTVSGenres = async function () {
  if (state.tvsGenresInfo.length !== 0) return;

  const response = await fetch(`${BASE_URL}/genre/tv/list?language=en`, OPTIONS);
  const { genres } = await response.json();

  state.tvsGenresInfo = genres;
};
