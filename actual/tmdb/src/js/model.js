/////////////////////////////////////////////////
// MODEL of the MVC architecture
//
// Description: Fetches and posts information to the API
/////////////////////////////////////////////////

import { OPTIONS, BASE_URL, BASE_URL_IMAGE, IMG_SIZE } from "./config.js";

/////////////////////////////////////////////////
///////// Represents the state of the system

export const state = {
  popularMoviesInfo: [], // [{ popularMovies: [{...}, {...}, ...], page: _}, ...]
  movieSpotlightInfo: [], // [{ title: '', releaseDate: '', ... }, ...]
};

/////////////////////////////////////////////////
///////// Fetches popular movies

export const fetchPopularMovies = async function (page) {
  try {
    const response = await fetch(`${BASE_URL}/movie/popular/?language=en-US&page=${page}`, OPTIONS);
    const popularMovies = await response.json();

    state.popularMoviesInfo.push({
      popularMovies: popularMovies.results,
      page: popularMovies.page,
    });

    return popularMovies;
  } catch (err) {
    console.error(`(model.js::fetchPopularMovies()) ${err}`);
    throw err;
  }
};

/////////////////////////////////////////////////
///////// Determines which movies are in the
///////// spotlight (i.e. top 3 most popular)

export const getMovieGenres = async function (movieGenreIDs) {
  try {
    const response = await fetch(`${BASE_URL}/genre/movie/list?language=en`, OPTIONS);
    const { genres } = await response.json();
    const movieGenres = [];
    let counter = 0;

    genres.every((genreObj) => {
      if (movieGenreIDs.some((genreID) => genreID === genreObj.id)) {
        movieGenres.push(genreObj.name);
        counter++;
      }

      if (counter === movieGenreIDs.length) return false;

      return true;
    });

    return movieGenres;
  } catch (err) {
    console.error(`(model.js::getGenres()) ${err}`);
    throw err;
  }
};

export const determineMovieSpotlight = async function () {
  if (state.popularMoviesInfo.length === 0 || state.popularMoviesInfo[0].popularMovies.length < 3) return;

  const mostPopularMovies = state.popularMoviesInfo[0].popularMovies;

  // FIXME: Magic numbers
  for (let i = 0; i < 3 * 9; i += 9) {
    let entry = {};

    entry.title = mostPopularMovies[i].title;
    entry.releaseDate = mostPopularMovies[i].release_date;

    try {
      entry.genres = await getMovieGenres(mostPopularMovies[i].genre_ids);
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
