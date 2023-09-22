import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';

import 'core-js/stable'; // for polyfilling everything besides async/await
import 'regenerator-runtime/runtime'; // for polyfilling async/await

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    // Gets food id from URL
    const id = window.location.hash.slice(1);

    if (!id) return;

    recipeView.renderSpinner();

    // Fetches recipe information
    await model.loadRecipe(id);
    const { recipe } = model.state;

    // Renders recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    console.error(`{IN controller.js} ${err}`);
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    // Renders spinner while waiting for results
    resultsView.renderSpinner();

    // Gets search query from model
    const query = searchView.getQuery();

    if (!query) return;

    // Fetches recipes about the query
    await model.loadSearchResults(`${query}`);

    // Renders search results
    resultsView.render(model.getSearchResultsPage());

    // Renders pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    console.error(`{IN controller.js} ${err}`);
  }
};

const controlPagination = function (goToPage) {
  // Renders new search results
  resultsView.render(model.getSearchResultsPage(goToPage));

  // Renders new pagination buttons
  paginationView.render(model.state.search);
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
};

init();
