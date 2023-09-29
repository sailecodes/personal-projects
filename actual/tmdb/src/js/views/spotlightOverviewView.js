class SpotlightOverviewView {
  initOverview(firstMovieSpotlight) {
    document.querySelector(".content-spotlight--slider").insertAdjacentHTML(
      "afterend",
      `<div class="content-spotlight--overview">
        <div>
          <div>
            <p class="content-spotlight--overview-title">${firstMovieSpotlight.title}</p>
            <p class="content-spotlight--overview-rating">${firstMovieSpotlight.rating}</p>
          </div>
          <button class="content-spotlight--overview-back-btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="content-spotlight--overview-back-btn-icon">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
            </svg>
          </button>
        </div>
        <p class="content-spotlight--overview-date">Release Date: ${firstMovieSpotlight.releaseDate}</p>
        <div class="content-spotlight--overview-genres">
          <p>Genres: &nbsp;</p>
          ${firstMovieSpotlight.genres
            .map((genre, index) => {
              return index === firstMovieSpotlight.genres.length - 1
                ? `<p class="content-spotlight--overview-genre">${genre}</p>`
                : `<p class="content-spotlight--overview-genre">${genre}, &nbsp;</p>`;
            })
            .join("")}
        </div>
        <p class="content-spotlight--overview-description">${firstMovieSpotlight.description}</p>
      </div>`
    );
  }

  addOverviewVisibleHandler() {
    document.querySelectorAll(".content-spotlight--more-container").forEach((container) => {
      container.addEventListener("click", () => {
        this.#makeBackgroundTextInvisible(container);
        document.querySelector(".content-spotlight--overview").style.transform = "translateX(0%)";
      });
    });
  }

  #makeBackgroundTextInvisible(container) {
    container.previousElementSibling.style.opacity = "0";
    container.style.opacity = "0";
  }

  addOverviewInvisibleHandler() {
    document.querySelector(".content-spotlight--overview-back-btn").addEventListener("click", () => {
      this.#makeBackgroundTextVisible();
      document.querySelector(".content-spotlight--overview").style.transform = "translateX(-100%)";
    });
  }

  #makeBackgroundTextVisible() {
    const mainContent = document.querySelector(`.content-spotlight--main-content[style="transform: translateX(0%);"]`);

    mainContent.querySelector(".content-spotlight--title").style.opacity = "";
    mainContent.querySelector(".content-spotlight--more-container").style.opacity = "";
  }

  addChangeOverviewFromBtnHandler(movieSpotlightInfo) {
    document.querySelectorAll(".content-spotlight--btn").forEach((button) => {
      button.addEventListener("click", (e) => {
        if (e.currentTarget.classList.contains("content-spotlight--left-btn")) {
          this.#changeOverview(false, movieSpotlightInfo);
        } else if (e.currentTarget.classList.contains("content-spotlight--right-btn")) {
          this.#changeOverview(true, movieSpotlightInfo);
        }
      });
    });
  }

  #changeOverview(buttonFlag, movieSpotlightInfo) {
    let currentSlide = this.#getCurrentSlide(buttonFlag);
    const currentContent = movieSpotlightInfo[currentSlide];

    // TODO:
    console.log(currentContent);
  }

  #getCurrentSlide(buttonFlag) {
    let ret = 0;

    document.querySelectorAll(".content-spotlight--marker").forEach((marker) => {
      if (marker.classList.contains("content-spotlight--marker-active")) {
        if (!buttonFlag) ret = Number(marker.dataset.slide) === 0 ? 2 : Number(marker.dataset.slide) - 1;
        else ret = Number(marker.dataset.slide) === 2 ? 0 : Number(marker.dataset.slide) + 1;
      }
    });

    return ret;
  }
}

export default new SpotlightOverviewView();
