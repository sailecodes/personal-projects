/////////////////////////////////////////////////
// CONTROLLER of the MVC architecture
//
// Description: Controls data flow between the
//              model and different views
/////////////////////////////////////////////////

import * as movieModel from "./models/movieModel.js";

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
  await Promise.all([
    movieModel.fetchMovieGenres(),
    movieModel.fetchMostPopularMovies(1),
    movieModel.fetchTopRatedMovies(1),
  ]);
  await movieModel.fetchMoviesByGenre(); // Note: Dependent on fetchMovieGenres()
};

/////////////////////////////////////////////////
///////// Movie spotlight functionality

const controlMovieSpotlight = function () {
  // Determines the top 3 most popular movies
  movieModel.determineMovieSpotlightContent();

  // Displays the top 3 most popular movies in the spotlight
  // Note: Dependent on above code
  spotlightContentView.initVars(movieModel.state.movieSpotlightInfo);
  spotlightContentView.initDefaultState();

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

const controlMovieTracks = async function () {
  // Determines the top rated movies and most popular movies by genre
  movieModel.determineMovieTracksContent();

  // Fetches relevant backdrops of each movie in the tracks
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
///////// Movie init

const movieInit = async function () {
  await controlMovieDefaultState();
  controlMovieSpotlight();
  await controlMovieTracks();
};

// movieInit();

let trailerPlayFlag = false;
const trailerBtn = document.querySelector(".content-spotlight--trailer-btn");

trailerBtn.addEventListener("click", (e) => {
  const ytIframe = document.querySelector(".content-spotlight--trailer");
  const trailerBtnText = document.querySelector(".content-spotlight--trailer-text");

  if (trailerPlayFlag) {
    trailerBtnText.textContent = "Watch trailer";
    ytIframe.style.transitionDuration = "0.1s";
    ytIframe.style.opacity = "0";
    ytIframe.contentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}', "*");
  } else {
    trailerBtnText.textContent = "Pause trailer";
    ytIframe.style.transitionDuration = "1s";
    ytIframe.style.transitionDelay = "1s";
    ytIframe.style.opacity = "1";
    ytIframe.allow = "autoplay";
    ytIframe.src = ytIframe.src.concat("&autoplay=1");
  }

  trailerPlayFlag = !trailerPlayFlag;
});
