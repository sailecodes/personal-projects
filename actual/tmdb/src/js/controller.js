/////////////////////////////////////////////////
// CONTROLLER of the MVC architecture
//
// Description: Controls data flow between the model and different views
/////////////////////////////////////////////////

import * as model from "./model.js";
import searchBarView from "./views/searchBarView.js";
import spotlightContentView from "./views/spotlightContentView.js";
import spotlightSliderView from "./views/spotlightSliderView.js";
import spotlightOverviewView from "./views/spotlightOverviewView.js";

/////////////////////////////////////////////////
///////// Search bar functionality

searchBarView.initHandlers();

/////////////////////////////////////////////////
///////// Default movie state init

const controlMovieDefaultState = async function () {
  await Promise.all([model.fetchMovieGenres(), model.fetchMostPopularMovies(1), model.fetchTopRatedMovies(1)]);
  await model.fetchMoviesByGenre();
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

const controlMovieTracks = function () {
  model.determineMovieTracksContent();
};

/////////////////////////////////////////////////
///////// Movie init

const movieInit = async function () {
  await controlMovieDefaultState();
  controlMovieSpotlight();
  controlMovieTracks();
};

movieInit();
