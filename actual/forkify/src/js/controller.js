import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';

import 'core-js/stable'; // for polyfilling everything besides async/await
import 'regenerator-runtime/runtime'; // for polyfilling async/await

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    // Gets food id from URL
    const id = window.location.hash.slice(1);

    if (!id) return;

    // Marks selected search result
    resultsView.update(model.getSearchResultsPage());
    bookmarksView.update(model.state.bookmarks);

    // Renders spinner while waiting for UI
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

const controlServings = function (newServings) {
  // Updates the serving size
  model.updateServings(newServings);

  // Renders the recipe with the new serving size
  //
  // BEFORE: recipeView.render(model.state.recipe);
  // Note: Different from recipeView.render() in that it only renders
  // certain parts of the DOM
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  // Adds or removes bookmark property
  if (!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe);
  } else {
    model.removeBookmark(model.state.recipe.id);
  }

  // Updates bookmark icon
  recipeView.update(model.state.recipe);

  // Renders bookmarks
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const initHandlers = function () {
  bookmarksView.addHandlerRenderer(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
};

initHandlers();
