/////////////////////////////////////////////////
// CONTROLLER of the MVC architecture
//
// Description:
//  Controls information flow between the model and different views
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
///////// Spotlight functionality

const controlInitMovieSpotlight = async function () {
  try {
    // Fetches the first page of popular movies
    if (model.state.popularMoviesInfo.length === 0) await model.fetchPopularMovies(1);

    // Determines the top 3 most popular movies
    if (model.state.movieSpotlightInfo.length === 0) await model.determineMovieSpotlight();

    // Displays the top 3 most popular movies in the spotlight
    // Note: Dependent on above code
    spotlightContentView.initContent(model.state.movieSpotlightInfo);

    // Readies the slider functionality
    // Note: Dependent on above code
    spotlightSliderView.initVars();
    spotlightSliderView.initDefaultState();
    spotlightSliderView.initHandlers();

    // Readies the initial overview and overview handlers
    spotlightOverviewView.initDefaultState(model.state.movieSpotlightInfo[0]); // Assumes movieSpotlightInfo is non-empty
    spotlightOverviewView.initVars();
    spotlightOverviewView.addOnReadBtnClickedHandler();
    spotlightOverviewView.addOnOverviewBackBtnClickedHandler();
    spotlightOverviewView.addOnClippedTitleAnimDoneHandler();
    spotlightOverviewView.addOnSpotlightBtnClickedHandler(model.state.movieSpotlightInfo);
    spotlightOverviewView.addOnArrowKeyClickedHandler(model.state.movieSpotlightInfo);
    spotlightOverviewView.addOnMarkerClickedHandler(model.state.movieSpotlightInfo);
  } catch (err) {
    console.error(`(controller.js::controlSpotlightMovieData()) ${err})`);
    throw err;
  }
};

controlInitMovieSpotlight();
