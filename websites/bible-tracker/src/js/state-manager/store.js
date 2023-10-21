import { createStore, computed, action, thunk } from "easy-peasy";

export default createStore({
  oldTestament: [],
  setOldTestament: action((state, payload) => {
    state.oldTestament = payload;
  }),
  searchText: "",
  setSearchText: action((state, payload) => {
    state.searchText = payload;
  }),
  getOldTestament: thunk(async (actions, newPost, helpers) => {}),
});
