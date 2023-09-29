class SpotlightContentView {
  #slider = document.querySelector(".content-spotlight--slider");

  initContent(movieSpotlightInfo) {
    movieSpotlightInfo.forEach((content, index) => {
      this.#slider.insertAdjacentHTML(
        "beforeend",
        `<div class="content-spotlight--main-content">
          <img class="content-spotlight--backdrop" src="${content.backdropPath}" />
          <div>  
            <p class="content-spotlight--title">${content.title}</p>
            <div class="content-spotlight--more-container">
              <p class="content-spotlight--more">Read description</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="content-spotlight--more-icon">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
              </svg>
            </div>
          </div>
        </div>`
      );
    });
  }
}

export default new SpotlightContentView();
