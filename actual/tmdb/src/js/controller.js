/////////////////////////////////////////////////
// CONTROLLER of the MVC architecture
//
// Description: Controls data flow between the model and different views
/////////////////////////////////////////////////

import * as model from "./model.js";
import searchBarView from "./views/searchbar/searchBarView.js";
import spotlightContentView from "./views/spotlight/spotlightContentView.js";
import spotlightSliderView from "./views/spotlight/spotlightSliderView.js";
import spotlightOverviewView from "./views/spotlight/spotlightOverviewView.js";
import trackContentView from "./views/track/trackContentView.js";
import trackSliderView from "./views/track/trackSliderView.js";

/////////////////////////////////////////////////
///////// Search bar functionality

searchBarView.initHandlers();

/////////////////////////////////////////////////
///////// Default movie state init

const controlMovieDefaultState = async function () {
  await Promise.all([model.fetchMovieGenres(), model.fetchMostPopularMovies(1), model.fetchTopRatedMovies(1)]);
  await model.fetchMoviesByGenre(); // Note: Dependent on fetchMovieGenres()
};

/////////////////////////////////////////////////
///////// Movie spotlight functionality

const controlMovieSpotlight = function () {
  // Determines the top 3 most popular movies
  model.determineMovieSpotlightContent();

  // Displays the top 3 most popular movies in the spotlight
  // Note: Dependent on above code
  spotlightContentView.initVars(model.state.movieSpotlightInfo);
  spotlightContentView.initDefaultState();

  // Readies the slider functionality
  // Note: Dependent on above code
  spotlightSliderView.initVars();
  spotlightSliderView.initDefaultState();
  spotlightSliderView.initHandlers();

  // Readies the overview functionality
  // Note: Dependent on above code
  spotlightOverviewView.initDefaultState(model.state.movieSpotlightInfo[0]);
  spotlightOverviewView.initVars(model.state.movieSpotlightInfo);
  spotlightOverviewView.initHandlers();
};

/////////////////////////////////////////////////
///////// Movie tracks functionality

const controlMovieTracks = async function () {
  // Determines the top rated movies and most popular movies by genre
  model.determineMovieTracksContent();

  // Fetches relevant backdrops of each movie in the tracks
  // Note: Dependent on above code
  await model.fetchBackdropsOfTrackMovies();

  //
  trackContentView.initVars(model.state.movieTracksInfo);
  trackContentView.initDefaultState();

  //
  trackSliderView.initVars();
  trackSliderView.addOnSliderHoverHandler();
  trackSliderView.addOnSliderBtnClickHandler();
};

/////////////////////////////////////////////////
///////// Movie init

const movieInit = async function () {
  await controlMovieDefaultState();
  controlMovieSpotlight();
  await controlMovieTracks();
};

movieInit();
