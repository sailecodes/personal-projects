class SpotlightContentView {
  #spotlightContent;
  #slider;

  initVars(spotlightContent) {
    this.#spotlightContent = spotlightContent;
    this.#slider = document.querySelector(".content-spotlight--slider");
  }

  initDefaultState() {
    this.#spotlightContent.forEach((content) => {
      this.#slider.insertAdjacentHTML(
        "beforeend",
        `
        <div class="content-spotlight--main-content">
          <div class="content-spotlight--trailer-container">
            <iframe
              class="content-spotlight--trailer"
              frameborder="none"
              src="https://www.youtube.com/embed/${content.trailerUrl}?enablejsapi=1&rel=0&controls=0&autoplay=1">
            </iframe>
          </div>
          <img class="content-spotlight--backdrop" src="${content.backdropPath}" />
          <div class="content-spotlight--text-container">
            <p class="content-spotlight--title">${content.title}</p>
            <div class="content-spotlight--more">
              <button class="content-spotlight--more-btn content-spotlight--desc-btn">
                <p class="content-spotlight--desc-text">Read description</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="content-spotlight--text-icon">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                </svg>
              </button>
              <button class="content-spotlight--more-btn content-spotlight--trailer-btn">
                <p class="content-spotlight--trailer-text">Watch trailer</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="content-spotlight--text-icon">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        `
      );
    });
  }
}

export default new SpotlightContentView();
