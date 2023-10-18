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
    this.#trackContent.forEach((content, index) => {
      this.#track.insertAdjacentHTML(
        "beforeend",
        `<div class="content-tracks--section">
          <div class="content-tracks--section-heading">
            <p class="content-tracks--section-heading-title">${content.heading}</p>
            <div class="content-tracks--section-slider-markers">
              <div class="content-tracks--section-slider-marker content-tracks--section-slider-marker-active"></div>
              <div class="content-tracks--section-slider-marker"></div>
              <div class="content-tracks--section-slider-marker"></div>
              <div class="content-tracks--section-slider-marker"></div>
            </div>
          </div>

          <div class="content-tracks--section-slider" data-section-slider="${index}">
            ${content.movies
              .map((movie, index) => {
                return `<div class="content-tracks--section-slider-content"
                             style="transform: translateX(${index * 104.5}%)
                                    ${index === 5 ? "; filter: brightness(50%)" : ""}">
                          <div class="content-tracks--overview">
                            <div class="content-tracks--trailer-container">
                              <iframe
                                class="content-tracks--trailer"
                                frameborder="none"
                                src="https://www.youtube.com/embed/tgbNymZ7vqY?enablejsapi=1&controls=0&autoplay=1">
                              </iframe>
                            </div>
                            <img
                              class="content-tracks--overview-img"
                              src="${BASE_URL_IMG}/${IMG_SIZE}${movie.backdropPath}" />
                            <div class="content-tracks--overview-meta">
                              <div>
                                <p class="content-tracks--overview-rating" style="background-color: ${this.#getRatingColor(
                                  movie.rating
                                )}">${this.#roundToDecimalPlace(movie.rating, 1)}</p>
                                <div class="content-tracks--overview-genres">
                                  ${movie.genres
                                    .map((genre, index) => {
                                      if (index > 2) return ``;

                                      return index === (movie.genres.length - 1 < 2 ? movie.genres.length - 1 : 2)
                                        ? `<p class="content-spotlight--overview-genre">${genre}</p>`
                                        : `<p class="content-spotlight--overview-genre">${genre}, &nbsp;</p>`;
                                    })
                                    .join("")}
                                </div>
                                <div>
                                  <button class="content-tracks--overview-btn content-tracks--overview-desc-btn">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke-width="1.5"
                                      stroke="currentColor"
                                      class="content-tracks--overview-btn-icon content-tracks--overview-desc-btn-icon">
                                      <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                                    </svg>
                                  </button>
                                  <button class="content-tracks--overview-btn content-tracks--overview-trailer-btn">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke-width="1.5"
                                      stroke="currentColor"
                                      class="content-tracks--overview-btn-icon content-tracks--overview-trailer-btn-icon">
                                      <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                      <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" />
                                    </svg>
                                  </button>
                                </div>
                              </div>
                              <p class="content-tracks--overview-desc">${movie.description}</p>
                            </div>
                          </div>
                        </div>`;
              })
              .join("")}
          </div>

          <button class="content-tracks--btn content-tracks--left-btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="content-tracks--btn-icon">
              <path class="path" stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <button class="content-tracks--btn content-tracks--right-btn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="content-tracks--btn-icon">
                <path class="path" stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
          </button>

          <div class="slider-shadow-left-sm"></div>
          <div class="slider-shadow-right-sm"></div>
        </div>`
      );
    });
  }

  #roundToDecimalPlace(num, decimalPlaces) {
    return (Math.round(num * 10) / 10).toFixed(decimalPlaces);
  }

  #getRatingColor(rating) {
    if (rating >= 9.0) return "var(--c-rating-best)";
    else if (rating >= 8.0) return "var(--c-rating-good)";
    else if (rating >= 7.0) return "var(--c-rating-okay)";
    else if (rating >= 6.0) return "var(--c-rating-bad)";
    else return "var(--c-rating-worst)";
  }
}

export default new TrackContentView();
