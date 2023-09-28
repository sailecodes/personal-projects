/////////////////////////////////////////////////
// CONTROLLER of the MVC architecture
//
// Description:
//  Controls information flow between the model and different views
/////////////////////////////////////////////////

import * as model from "./model.js";
import searchBarView from "./views/searchBarView.js";
import spotlightView from "./views/spotlightView.js";

/////////////////////////////////////////////////
///////// Search bar functionality

searchBarView.initHandlers();

/////////////////////////////////////////////////
///////// Movie spotlight functionality

spotlightView.initDefaultState();
spotlightView.initHandlers();

const controlSpotlight = async function () {
  // Fetches the first page of popular movies
  await model.fetchPopularMovies(1);

  // Determines the top 3 most popular movies
  await model.determineMovieSpotlight();
};

controlSpotlight();
