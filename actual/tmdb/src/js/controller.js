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

const controlPopularMovies = async function () {
  await model.fetchPopularMovies(1); // Default page number is 1
  await model.determineMovieSpotlight();

  console.log(model.state);
};

controlPopularMovies();
