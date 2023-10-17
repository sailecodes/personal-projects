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
  MOVIE_GENRES_INTER_URL,
  TOP_RATED_INTER_URL,
  MOST_POPULAR_INTER_URL,
  MOVIE_BY_GENRE_INTER_URL,
  IMG_SIZE,
  MOST_POPULAR_GENRES,
  SPOTLIGHT_CONTENT_NUM,
  TOP_TRACK_HEADING,
} from "../config.js";

/////////////////////////////////////////////////
///////// Represents the state of the system
/////////////////////////////////////////////////

export const state = {
  unqMovies: new Map(),

  movieGenresInfo: [],

  mostPopularMoviesInfo: [], // [{ mostPopularMovies: [{...}, {...}, ...], page: _ }, { ... }, ...]
  movieSpotlightInfo: [], // [{ id: _, title: '', releaseDate: '', ... }, ...]

  topRatedMoviesInfo: [],
  moviesByGenreInfo: [],
  movieTracksInfo: [],
};

/////////////////////////////////////////////////
///////// Helper functions
/////////////////////////////////////////////////

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

const reformatEntry = function (entry) {
  return {
    id: entry.id,
    title: entry.title,
    releaseDate: entry.release_date,
    genres: getMovieGenresStr(entry.genre_ids),
    description: entry.overview,
    rating: entry.vote_average,
    backdropPath: `${BASE_URL_IMG}/${IMG_SIZE}${entry.backdrop_path}`,
  };
};

/////////////////////////////////////////////////
///////// Fetch functions
/////////////////////////////////////////////////

export const fetchMovieGenres = async function () {
  if (state.movieGenresInfo.length !== 0) return;

  try {
    const response = await fetch(`${BASE_URL}${MOVIE_GENRES_INTER_URL}`, OPTIONS);
    const { genres } = await response.json();

    state.movieGenresInfo = genres;
  } catch (err) {
    console.error(`(model.js::fetchMovieGenres()) ${err}`);
    throw err;
  }
};

/*export const markUnqMovies = function (dataArr) {
  for (let i = 0; i < dataArr.length; i++) {
    for (let j = 0; j < dataArr[i].results.length; j++) {
      if (!state.mostPopularMoviesInfo.unqMovies.has(dataArr[i].results[j].id)) {
        state.mostPopularMoviesInfo.unqMovies.set(dataArr[i].results[j].id, "");
      }
    }
  }
};*/

export const fetchMostPopularMovies = async function (page) {
  if (state.mostPopularMoviesInfo.length !== 0) return;

  try {
    const response = await fetch(`${BASE_URL}${MOST_POPULAR_INTER_URL}page=${page}`, OPTIONS);
    const data = await response.json();

    state.mostPopularMoviesInfo.push({
      page: data.page,
      results: data.results.slice(0, SPOTLIGHT_CONTENT_NUM),
    });
  } catch (err) {
    console.error(`(model.js::fetchMostPopularMovies()) ${err}`);
    throw err;
  }
};

export const fetchTopRatedMovies = async function (page) {
  if (state.topRatedMoviesInfo.length !== 0) return;

  try {
    const response = await fetch(`${BASE_URL}${TOP_RATED_INTER_URL}page=${page}`, OPTIONS);
    const data = await response.json();

    state.topRatedMoviesInfo.push({
      page: data.page,
      results: data.results.map((movie) => {
        return reformatEntry(movie);
      }),
    });
  } catch (err) {
    console.error(`(model.js::fetchTopRatedMovies()) ${err}`);
    throw err;
  }
};

export const fetchMoviesByGenre = async function (page) {
  if (state.moviesByGenreInfo.length !== 0) return;

  const movieGenresId = getMovieGenresId(MOST_POPULAR_GENRES);

  fetch(`${BASE_URL}with_genres=12&page=1`, OPTIONS);

  try {
    const response = await Promise.all([
      fetch(`${BASE_URL}${MOVIE_BY_GENRE_INTER_URL}with_genres=${movieGenresId[0]}&page=${page}`, OPTIONS),
      fetch(`${BASE_URL}${MOVIE_BY_GENRE_INTER_URL}with_genres=${movieGenresId[1]}&page=${page}`, OPTIONS),
      fetch(`${BASE_URL}${MOVIE_BY_GENRE_INTER_URL}with_genres=${movieGenresId[2]}&page=${page}`, OPTIONS),
      fetch(`${BASE_URL}${MOVIE_BY_GENRE_INTER_URL}with_genres=${movieGenresId[3]}&page=${page}`, OPTIONS),
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
          movies: result.results.map((movie) => {
            return reformatEntry(movie);
          }),
        },
      });
    });
  } catch (err) {
    console.error(`(model.js::fetchMoviesByGenre()) ${err}`);
    throw err;
  }
};

export const fetchBackdropsOfTrackMovies = async function () {
  try {
    for (let i = 0; i < state.movieTracksInfo.length; i++) {
      for (let j = 0; j < state.movieTracksInfo[i].movies.length; j++) {
        const response = await fetch(
          `${BASE_URL}/movie/${state.movieTracksInfo[i].movies[j].id}/images?include_image_language=en`,
          OPTIONS
        );
        const imgObj = await response.json();

        state.movieTracksInfo[i].movies[j].backdropPath =
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

export const fetchTrailerKeyOfSpotlightMovies = async function () {
  for (let i = 0; i < state.movieSpotlightInfo.length; i++) {
    const movieId = state.movieSpotlightInfo[i].id;
    const response = await fetch(`${BASE_URL}/movie/${movieId}/videos?language=en-US`, OPTIONS);
    const { results: urls } = await response.json();

    state.movieSpotlightInfo[i].trailerUrl = "";

    if (urls.length === 1) {
      state.movieSpotlightInfo[i].trailerUrl = urls[0].key;
    } else {
      for (let j = 0; j < urls.length; j++) {
        if (
          urls[j].official &&
          urls[j].type.toLowerCase() === "trailer" &&
          urls[j].name.toLowerCase().includes("official") &&
          urls[j].name.toLowerCase().includes("trailer")
        ) {
          state.movieSpotlightInfo[i].trailerUrl = urls[j].key;
        } else if (
          !state.movieSpotlightInfo[i].trailerUrl &&
          urls[j].official &&
          urls[j].type.toLowerCase() === "trailer"
        ) {
          state.movieSpotlightInfo[i].trailerUrl = urls[j].key;
        }
      }
    }
  }
};

/////////////////////////////////////////////////
///////// Determines website content
/////////////////////////////////////////////////

export const determineSpotlightMovies = function () {
  if (state.mostPopularMoviesInfo.length === 0) return;

  const mostPopularMovies = state.mostPopularMoviesInfo[0].results;

  for (let i = 0; i < SPOTLIGHT_CONTENT_NUM; i++) state.movieSpotlightInfo.push(reformatEntry(mostPopularMovies[i]));
};

export const determineTrackMovies = function () {
  state.movieTracksInfo.push(
    { heading: TOP_TRACK_HEADING, movies: state.topRatedMoviesInfo[0].results },
    { heading: state.moviesByGenreInfo[0].genre, movies: state.moviesByGenreInfo[0].results.movies },
    { heading: state.moviesByGenreInfo[1].genre, movies: state.moviesByGenreInfo[1].results.movies },
    { heading: state.moviesByGenreInfo[2].genre, movies: state.moviesByGenreInfo[2].results.movies },
    { heading: state.moviesByGenreInfo[3].genre, movies: state.moviesByGenreInfo[3].results.movies }
  );
};
