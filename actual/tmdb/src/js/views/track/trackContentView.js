import { BASE_URL_IMG, IMG_SIZE } from "../../config.js";

class TrackContentView {
  #trackContent;
  #track;

  initVars(trackContent) {
    this.#trackContent = trackContent;
    this.#track = document.querySelector(".content-tracks");
  }

  initDefaultState() {
    this.#track.innerHTML = "";
    this.#trackContent.forEach((content) => {
      this.#track.insertAdjacentHTML(
        "beforeend",
        `<div class="content-tracks--section">
          <div class="content-tracks--section-heading">
            <p class="content-tracks--section-heading-title">${content.heading}</p>
            <div class="content-tracks--section-slider-markers">
              <div class="content-tracks--section-slider-marker"></div>
              <div class="content-tracks--section-slider-marker"></div>
            </div>
          </div>

          <div class="content-tracks--section-slider">
            ${content.movies
              .map((movie, index) => {
                return `<div class="content-tracks--section-slider-content" ${
                  index == 5 ? "style= 'filter: brightness(50%)'" : ""
                }>
                          <img
                            class="content-tracks--section-slider-content-img"
                            src="${BASE_URL_IMG}/${IMG_SIZE}${movie.trackBackdrop}"
                          />
                        </div>`;
              })
              .join("")}
          </div>

          <button class="content-tracks--btn content-tracks--right-btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="content-tracks--btn-icon">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>`
      );
    });
  }
}

export default new TrackContentView();
