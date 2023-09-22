import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';

import 'core-js/stable'; // for polyfilling everything besides async/await
import 'regenerator-runtime/runtime'; // for polyfilling async/await

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    // Gets food id from URL
    const id = window.location.hash.slice(1);
    console.log(id);

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
    // Gets search query from model
    const query = searchView.getQuery();

    if (!query) return;

    // Fetches recipes about the query
    await model.loadSearchResults(`${query}`);
    console.log(model.state.search.results);
  } catch (err) {
    console.error(`{IN controller.js} ${err}`);
  }
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
};

init();
