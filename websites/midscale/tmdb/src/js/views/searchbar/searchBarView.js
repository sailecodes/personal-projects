class SearchBarView {
  #searchContainer;
  #searchBar;
  #searchBarBtn;

  /**
   * Initializes class variables
   */
  initVars() {
    this.#searchContainer = document.querySelector(".nav-bar--search-form");
    this.#searchBar = document.querySelector(".nav-bar--search-bar");
    this.#searchBarBtn = document.querySelector(".nav-bar--search-bar-btn");
  }

  /**
   * Initializes class handlers
   */
  initHandlers() {
    this._handleSearch();
    this._handleSearchBarHoverState();
  }

  /**
   * Handles fetching search data
   *
   * TODO: Use input to fetch data from API
   */
  _handleSearch() {
    this.#searchContainer.addEventListener("submit", (e) => {
      e.preventDefault();

      console.log(this.#searchBar.value);

      if (this.#searchBar.value === "") return;

      this.#searchBar.value = "";
    });
  }

  /**
   * Handles the visibility of the search bar depending on the hover state
   */
  _handleSearchBarHoverState() {
    this.#searchBarBtn.addEventListener("mouseenter", () => {
      this.#toggleSearchBar(true);
    });

    this.#searchContainer.addEventListener("mouseleave", (e) => {
      this.#toggleSearchBar(false);
    });
  }

  #toggleSearchBar(flag) {
    this.#searchBar.style.width = flag ? "36rem" : "0rem";
    this.#searchBar.style.padding = flag ? "0 1rem 0 1rem" : "0rem";
  }
}

export default new SearchBarView();
