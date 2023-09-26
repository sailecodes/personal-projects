// Controller of the MVC architecture
//
// Description:
//  Controls information flow between the model and different views

import * as model from "./model.js";
import searchBar from "./views/searchBar.js";
import contentSpotlight from "./views/contentSpotlight.js";

/////////////////////////////////////////////////
///////// Nav Handlers Initialization

searchBar.initHandlers();
