import { createStore, computed, action, thunk } from "easy-peasy";
import axios from "axios";

export default createStore({
  newTestament: [],
  setNewTestament: action((state, payload) => {
    state.newTestament = payload;
  }),
  searchText: "",
  setSearchText: action((state, payload) => {
    state.searchText = payload;
  }),
});
