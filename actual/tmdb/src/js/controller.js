/////////////////////////////////////////////////
// CONTROLLER of the MVC architecture
//
// Description:
//  Controls information flow between the model and different views
/////////////////////////////////////////////////

import * as model from "./model.js";
import searchBar from "./views/searchBar.js";
import spotlight from "./views/spotlight.js";

/////////////////////////////////////////////////
///////// Search bar functionality

searchBar.initHandlers();

/////////////////////////////////////////////////
///////// Spotlight functionality

const controlPopularMovies = async function () {
  await model.fetchPopularMovies(1); // Default page number is 1
  await model.determineMovieSpotlight();

  console.log(model.state);
};

controlPopularMovies();
