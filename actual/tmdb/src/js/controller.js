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
///////// Search Bar Handlers Initialization

searchBar.initHandlers();
