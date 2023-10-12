/////////////////////////////////////////////////
// CONTROLLER of the MVC architecture
//
// Description: Controls data flow between the
//              model and different views
/////////////////////////////////////////////////

import * as movieModel from "./models/movieModel.js";

import searchBarView from "./views/searchbar/searchBarView.js";
import spotlightContentView from "./views/spotlight/spotlightContentView.js";
import spotlightTrailerView from "./views/spotlight/spotlightTrailerView.js";
import spotlightSliderView from "./views/spotlight/spotlightSliderView.js";
import spotlightOverviewView from "./views/spotlight/spotlightOverviewView.js";
import trackContentView from "./views/track/trackContentView.js";
import trackSliderView from "./views/track/trackSliderView.js";

/////////////////////////////////////////////////
///////// Search bar functionality
/////////////////////////////////////////////////

searchBarView.initVars();
searchBarView.initHandlers();

/////////////////////////////////////////////////
///////// Default movie state init
/////////////////////////////////////////////////

const controlMovieDefaultState = async function () {
  await Promise.all([
    movieModel.fetchMovieGenres(),
    movieModel.fetchMostPopularMovies(1),
    movieModel.fetchTopRatedMovies(1),
  ]);
  await movieModel.fetchMoviesByGenre(); // Note: Dependent on fetchMovieGenres()
};

/////////////////////////////////////////////////
///////// Movie spotlight functionality
/////////////////////////////////////////////////

const controlMovieSpotlight = async function () {
  // Determines the top 3 most popular movies
  movieModel.determineSpotlightMovies();

  // Fetches the trailer key for each spotlight movie
  // Note: Dependent on above code
  await movieModel.fetchTrailerKeyOfSpotlightMovies();

  // Displays the top 3 most popular movies in the spotlight
  // Note: Dependent on above code
  spotlightContentView.initVars(movieModel.state.movieSpotlightInfo);
  spotlightContentView.initDefaultState();

  // Readies the trailer functionality
  // Note: Dependent on above code
  spotlightTrailerView.initVars();
  spotlightTrailerView.initHandlers();

  // Readies the slider functionality
  // Note: Dependent on above code
  spotlightSliderView.initVars();
  spotlightSliderView.initDefaultState();
  spotlightSliderView.initHandlers();

  // Readies the overview functionality
  // Note: Dependent on above code
  spotlightOverviewView.initDefaultState(movieModel.state.movieSpotlightInfo[0]);
  spotlightOverviewView.initVars(movieModel.state.movieSpotlightInfo);
  spotlightOverviewView.initHandlers();
};

/////////////////////////////////////////////////
///////// Movie tracks functionality
/////////////////////////////////////////////////

const controlMovieTracks = async function () {
  // Determines the top rated movies and most popular movies by genre
  movieModel.determineTrackMovies();

  // Fetches relevant backdrops of each track movie
  // Note: Dependent on above code
  await movieModel.fetchBackdropsOfTrackMovies();

  //
  trackContentView.initVars(movieModel.state.movieTracksInfo);
  trackContentView.initDefaultState();

  //
  trackSliderView.initVars();
  trackSliderView.initHandlers();
};

/////////////////////////////////////////////////
///////// Movie initialization
/////////////////////////////////////////////////

const movieInit = async function () {
  await controlMovieDefaultState();
  await Promise.all([controlMovieSpotlight() /*, controlMovieTracks()*/]);
};

movieInit();
