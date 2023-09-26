class SearchBar {
  #searchBarBtn = document.querySelector(".nav-bar--search-bar-btn");

  initHandlers() {
    this.#addSearchHandler();
    this.#addSearchBarHandler();
  }

  #addSearchHandler() {
    const searchContainer = document.querySelector(".nav-bar--search");

    // TODO: Use later
    searchContainer.addEventListener("submit", (e) => {
      e.preventDefault();
    });
  }

  // TODO: Refactor
  #addSearchBarHandler() {
    this.#searchBarBtn.addEventListener("mouseenter", () => {
      const searchBar = document.querySelector(".nav-bar--search-bar");

      searchBar.style.width = "36rem";
      searchBar.style.padding = "0 1rem 0 1rem";

      const searchContainer = document.querySelector(".nav-bar--search");

      searchContainer.addEventListener("mouseleave", () => {
        console.log(1);
        const searchBar = document.querySelector(".nav-bar--search-bar");
        searchBar.style.width = "0rem";
        searchBar.style.padding = "0rem";
      });
    });
  }
}

export default new SearchBar();
