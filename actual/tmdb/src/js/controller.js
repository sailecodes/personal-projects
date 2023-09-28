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

const controlSpotlightMovieData = async function () {
  try {
    // Fetches the first page of popular movies
    if (model.state.popularMoviesInfo.length === 0) await model.fetchPopularMovies(1);

    // Determines the top 3 most popular movies
    if (model.state.movieSpotlightInfo.length === 0) await model.determineMovieSpotlight();

    // Displays the top 3 most popular movies in the spotlight
    spotlightContentView.initSpotlightContent(model.state.movieSpotlightInfo);

    // Readies the slider functionality
    spotlightSliderView.initVars();
    spotlightSliderView.initDefaultState();
    spotlightSliderView.initHandlers();

    return model.state.movieSpotlightInfo;
  } catch (err) {
    console.error(`(controller.js::controlSpotlightMovieData()) ${err})`);
    throw err;
  }
};

controlSpotlightMovieData();

// const controlSpotlightMovieOverviewVisible = async function () {
//   try {
//     // Waits for spotlight movie data to become available
//     const movieSpotlightInfo = await controlSpotlightMovieData();

//     spotlightOverviewView.addOverviewVisibleHandler(movieSpotlightInfo);
//   } catch (err) {
//     console.error(`(controller.js::controlSpotlightMovieOverviewVisible()) ${err})`);
//     throw err;
//   }
// };
