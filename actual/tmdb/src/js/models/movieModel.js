/////////////////////////////////////////////////
// MOVIE MODEL of the MVC architecture
//
// Description: Fetches movie data from and posts
//              movie data to the API
/////////////////////////////////////////////////

import {
  OPTIONS,
  BASE_URL,
  BASE_URL_IMG,
  IMG_SIZE,
  SPOTLIGHT_CONTENT_NUM,
  POPULAR_MOVIE_SKIP_OFFSET,
  MOST_POPULAR_GENRES,
  TOP_TRACK_HEADING,
} from "../config.js";

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
///////// Fetches top rated (popular) movies

export const fetchTopRatedMovies = async function (page) {
  if (state.topRatedMoviesInfo.length !== 0) return;

  try {
    const response = await fetch(
      `${BASE_URL}/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}`
        .concat(`&primary_release_date.gte=2020-01-01&release_date.gte=2020-01-01&sort_by=popularity.desc`)
        .concat(`&vote_average.gte=8&vote_count.gte=100&with_original_language=en&without_genres=16`),
      OPTIONS
    );
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
///////// Fetches movies by specified genres

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

    moviesByGenre.forEach((result, index) => {
      state.moviesByGenreInfo.push({
        genre: MOST_POPULAR_GENRES[index],
        results: {
          page: result.page,
          movies: result.results,
        },
      });
    });
  } catch (err) {
    console.error(`(model.js::fetchMoviesByGenre()) ${err}`);
    throw err;
  }
};

/////////////////////////////////////////////////
///////// Fetches backdrops of track movies

export const fetchBackdropsOfTrackMovies = async function () {
  try {
    for (let i = 0; i < state.movieTracksInfo.length; i++) {
      for (let j = 0; j < state.movieTracksInfo[i].movies.length; j++) {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${state.movieTracksInfo[i].movies[j].id}/images?include_image_language=en`,
          OPTIONS
        );
        const imgObj = await response.json();

        state.movieTracksInfo[i].movies[j].trackBackdrop =
          imgObj.backdrops.length === 0
            ? state.movieTracksInfo[i].movies[j].backdrop_path
            : imgObj.backdrops[0].file_path;
      }
    }
  } catch (err) {
    console.error(`(model.js::fetchBackdropsOfTrackMovies()) ${err}`);
    throw err;
  }
};

/////////////////////////////////////////////////
///////// Determines which movies are in the
///////// spotlight (i.e. top 3 most popular)

export const determineMovieSpotlightContent = function () {
  if (state.mostPopularMoviesInfo.length === 0) return;

  const mostPopularMovies = state.mostPopularMoviesInfo[0].mostPopularMovies;

  for (let i = 1; i < SPOTLIGHT_CONTENT_NUM * POPULAR_MOVIE_SKIP_OFFSET; i += POPULAR_MOVIE_SKIP_OFFSET) {
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
    entry.backdropPath = `${BASE_URL_IMG}/${IMG_SIZE}${mostPopularMovies[i].backdrop_path}`;

    state.movieSpotlightInfo.push(entry);
  }
};

/////////////////////////////////////////////////
///////// Determines which movies are in each
///////// track

export const determineMovieTracksContent = function () {
  state.movieTracksInfo.push(
    { heading: TOP_TRACK_HEADING, movies: state.topRatedMoviesInfo[0].topRatedMovies }
    // { heading: state.moviesByGenreInfo[0].genre, movies: state.moviesByGenreInfo[0].results.movies.slice(0, 10) },
    // { heading: state.moviesByGenreInfo[1].genre, movies: state.moviesByGenreInfo[1].results.movies.slice(0, 10) },
    // { heading: state.moviesByGenreInfo[2].genre, movies: state.moviesByGenreInfo[2].results.movies.slice(0, 10) },
    // { heading: state.moviesByGenreInfo[3].genre, movies: state.moviesByGenreInfo[3].results.movies.slice(0, 10) }
  );
};
