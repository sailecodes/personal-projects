import * as model from './model.js';
import recipeView from './views/recipeView.js';

import 'core-js/stable'; // for polyfilling everything besides async/await
import 'regenerator-runtime/runtime'; // for polyfilling async/await

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    console.log(id);

    if (!id) return;

    recipeView.renderSpinner();

    // Fetches recipe information from model
    await model.loadRecipe(id);
    const { recipe } = model.state;

    // Rendering recipe in recipeView
    recipeView.render(model.state.recipe);
  } catch (err) {
    console.error(`{IN controller.js} ${err}`);
    recipeView.renderError();
  }
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
};

init();
