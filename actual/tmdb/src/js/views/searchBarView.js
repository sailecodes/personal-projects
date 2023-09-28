class SearchBar {
  #searchContainer = document.querySelector(".nav-bar--search");
  #searchBar = document.querySelector(".nav-bar--search-bar");
  #searchBarBtn = document.querySelector(".nav-bar--search-bar-btn");

  initHandlers() {
    this.#addSearchHandler();
    this.#addSearchBarHandler();
  }

  #addSearchHandler() {
    this.#searchContainer.addEventListener("submit", this.#searchHandler.bind(this));
  }

  #searchHandler(e) {
    e.preventDefault();

    // TODO: Use later to get user search input
    console.log(this.#searchBar.value);

    if (this.#searchBar.value === "") {
      return;
    }

    // ...

    this.#searchBar.value = "";
  }

  #addSearchBarHandler() {
    this.#searchBarBtn.addEventListener("mouseenter", this.#searchBarHandler.bind(this));
  }

  #searchBarHandler() {
    this.#changeSearchBarStyle(true);
    this.#searchContainer.addEventListener("mouseleave", this.#changeSearchBarStyle.bind(this, false));
  }

  #changeSearchBarStyle(flag) {
    this.#searchBar.style.width = flag ? "36rem" : "0rem";
    this.#searchBar.style.padding = flag ? "0 1rem 0 1rem" : "0rem";
  }
}

export default new SearchBar();
