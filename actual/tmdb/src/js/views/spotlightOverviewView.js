import { SPOTLIGHT_OVERVIEW_TITLE_MAX_WIDTH } from "../config.js";

/**
 * Handles the view of the spotlight overview
 */
class SpotlightOverviewView {
  #spotlightContent;

  #spotlightOverview;
  #spotlightOverviewTitleClipCntr;
  #spotlightOverviewTitle;
  #spotlightOverviewRating;
  #spotlightOverviewReleaseDate;
  #spotlightOverviewGenres;
  #spotlightOverviewDesc;

  #CustomEventClippedTitleAnimDone;
  #clippedTitleAnimId;

  /**
   * Initializes class fields
   */
  initVars(spotlightContent) {
    this.#spotlightContent = spotlightContent;
    this.#spotlightOverview = document.querySelector(".content-spotlight--overview");
    this.#spotlightOverviewTitleClipCntr = document.querySelector(".content-spotlight--overview-title-clip");
    this.#spotlightOverviewTitle = this.#spotlightOverview.querySelector(".content-spotlight--overview-title");
    this.#spotlightOverviewRating = this.#spotlightOverview.querySelector(".content-spotlight--overview-rating");
    this.#spotlightOverviewReleaseDate = this.#spotlightOverview.querySelector(".content-spotlight--overview-date");
    this.#spotlightOverviewGenres = this.#spotlightOverview.querySelector(".content-spotlight--overview-genres");
    this.#spotlightOverviewDesc = this.#spotlightOverview.querySelector(".content-spotlight--overview-description");
    this.#CustomEventClippedTitleAnimDone = new Event("clippedTitleAnimDone");
  }

  /**
   * Inserts the default overview layout with initial content into the DOM
   *
   * @param {*} initialContent Contains the initial content
   */
  initDefaultState(initialContent) {
    document.querySelector(".content-spotlight--slider").insertAdjacentHTML(
      "afterend",
      `
        <div class="content-spotlight--overview">
          <div>
            <div class="content-spotlight--overview-title-clip">
              <p class="content-spotlight--overview-title">${initialContent.title}</p>
            </div>
            <p class="content-spotlight--overview-rating" style="background-color: ${this.#getNewRatingColor(
              initialContent.rating
            )};">${initialContent.rating}</p>
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
          <p class="content-spotlight--overview-date">Release Date: ${initialContent.releaseDate}</p>
          <div class="content-spotlight--overview-genres">
            <p>Genres: &nbsp;</p>
            ${initialContent.genres
              .map((genre, index) => {
                return index === initialContent.genres.length - 1
                  ? `<p class="content-spotlight--overview-genre">${genre}</p>`
                  : `<p class="content-spotlight--overview-genre">${genre}, &nbsp;</p>`;
              })
              .join("")}
          </div>
          <p class="content-spotlight--overview-description">${initialContent.description}</p>
        </div>
      `
    );
  }

  initHandlers() {
    this.addOnReadBtnClickedHandler();
    this.addOnOverviewBackBtnClickedHandler();
    this.addOnClippedTitleAnimDoneHandler();
    this.addOnSpotlightBtnClickedHandler();
    this.addOnArrowKeyClickedHandler();
    this.addOnMarkerClickedHandler();
  }

  // TODO: Maybe needed in the future if the spotlight is dynamically changed while on the website
  //       and spotlightContent needs to be updated so the handlers can use the right data. Maybe
  //       should be a handler, waiting for the signal that the spotlight content has been updated
  reassignSpotlightContent() {}

  /**
   * Resets the position of the overview title after animation
   */
  addOnClippedTitleAnimDoneHandler() {
    this.#spotlightOverviewTitle.addEventListener("clippedTitleAnimDone", function () {
      this.style.left = "-0.5%";
    });
  }

  /**
   * Makes the title and text in the spotlight invisible, moves the overview into the window upon clicking the 'read
   * description' container, and animates the overview title if clipped
   */
  addOnReadBtnClickedHandler() {
    document.querySelectorAll(".content-spotlight--more-container").forEach((container) => {
      container.addEventListener("click", () => {
        this.#toggleBackgroundText(true);

        this.#spotlightOverview.style.transform = "translateX(0%)";

        // Animates the overview title if clipped and dispatches a custom event after the animation to trigger the
        // event handler defined above
        this.#animateClippedTitle();
      });
    });
  }

  #animateClippedTitle() {
    if (this.#spotlightOverviewTitleClipCntr.offsetWidth >= this.#spotlightOverviewTitleClipCntr.scrollWidth) return;

    console.log(this.#spotlightOverviewTitleClipCntr.offsetWidth, this.#spotlightOverviewTitleClipCntr.scrollWidth);

    this.#spotlightOverviewTitle.style.transitionDuration = `${Math.ceil(
      this.#spotlightOverviewTitleClipCntr.scrollWidth / 112 // FIXME: magic number
    )}s`;

    const textWidth = this.#calcTitleWidth();
    const leftOver = ((textWidth - SPOTLIGHT_OVERVIEW_TITLE_MAX_WIDTH) / SPOTLIGHT_OVERVIEW_TITLE_MAX_WIDTH) * 100;

    console.log(textWidth, leftOver);

    this.#spotlightOverviewTitle.style.left = `-${leftOver}%`;
    this.#clippedTitleAnimId = setTimeout(
      () => this.#spotlightOverviewTitle.dispatchEvent(this.#CustomEventClippedTitleAnimDone),
      6000
    );
  }

  #calcTitleWidth() {
    this.#spotlightOverviewTitle.style.minWidth = "max-content";
    const width = this.#spotlightOverviewTitle.offsetWidth;
    this.#spotlightOverviewTitle.style.minWidth = "";

    return width;
  }

  /**
   * Makes the spotlight title and text visible, moves the overview out of the window upon clicking the back button
   * in the overview, and resets the position of the title (for the case of clipped title animation)
   */
  addOnOverviewBackBtnClickedHandler() {
    document.querySelector(".content-spotlight--overview-back-btn").addEventListener("click", () => {
      this.#toggleBackgroundText(false);

      this.#spotlightOverview.style.transform = "translateX(-100%)";

      this.#resetTitle();
    });
  }

  /**
   * Makes the title and text in the spotlight visible, moves the overview out of the window, changes the
   * overview content, and resets the position of the title (for the case of clipped title animation) upon clicking
   * any spotlight transition button
   *
   * TODO: --> (BUG) Background title doesn't appear during transition
   * TODO: --> (FUNCTIONALITY) Add the same functionality in the spotlight btns to arrow keys and markers
   */
  addOnSpotlightBtnClickedHandler() {
    document.querySelectorAll(".content-spotlight--btn").forEach((button) => {
      button.addEventListener("click", () => {
        this.#resetSpotlightAndOverview();
      });
    });
  }

  addOnArrowKeyClickedHandler() {
    document.addEventListener("keydown", () => {
      this.#resetSpotlightAndOverview();
    });
  }

  addOnMarkerClickedHandler() {
    document.querySelector(".content-spotlight--markers").addEventListener("click", (e) => {
      this.#resetSpotlightAndOverview();
    });
  }

  #resetSpotlightAndOverview() {
    this.#toggleBackgroundText(false);

    this.#spotlightOverview.style.transform = "translateX(-100%)";

    this.#resetTitle();

    // Changes overview content after 0.5 seconds to avoid visible changes during transition
    // Note: Must be < ~1 second to avoid not triggering the animation for clipped titles in the overview since the
    //       trigger is dependent on the new slide content
    setTimeout(() => {
      this.#changeOverview();
    }, 500);
  }

  #toggleBackgroundText(toggleFlag) {
    document.querySelector(
      `.content-spotlight--main-content[style="transform: translateX(0%);"] .content-spotlight--text-container`
    ).style.opacity = toggleFlag ? "0" : "";
  }

  #resetTitle() {
    // Note: Must execute to avoid animating the title to default position while already at the default position,
    //       which causes either a slight jitter or a clipped title to not animate (since it's stuck at the
    //       default position)
    clearTimeout(this.#clippedTitleAnimId);

    // this.#spotlightOverviewTitle.style.transition = "none";
    this.#spotlightOverviewTitle.style.left = "-0.5%";

    // Note: Must execute after some time to avoid conflict between transition = 'none' and transition = '...'
    // setTimeout(() => {
    //   this.#spotlightOverviewTitle.style.transition = "left 4s cubic-bezier(1, 1, 1, 1) 1.5s";
    // }, 100);
  }

  #changeOverview() {
    let currentSlide = this.#getCurrentSlide();
    const currentContent = this.#spotlightContent[currentSlide];

    this.#changeOverviewElements(currentContent);
    this.#spotlightOverviewRating.style.backgroundColor = this.#getNewRatingColor(
      Number(this.#spotlightOverviewRating.textContent)
    );
  }

  #getCurrentSlide() {
    let ret = 0;

    document.querySelectorAll(".content-spotlight--marker").forEach((marker) => {
      if (marker.classList.contains("content-spotlight--marker-active")) ret = marker.dataset.slide;
    });

    return ret;
  }

  #changeOverviewElements(currentContent) {
    this.#spotlightOverviewTitle.textContent = currentContent.title;
    this.#spotlightOverviewRating.textContent = currentContent.rating;
    this.#spotlightOverviewReleaseDate.textContent = `Release Date: ${currentContent.releaseDate}`;
    this.#spotlightOverviewGenres.innerHTML = "";
    this.#spotlightOverviewGenres.innerHTML = `
      <p>Genres: &nbsp;</p>
      ${currentContent.genres
        .map((genre, index) => {
          return index === currentContent.genres.length - 1
            ? `<p class="content-spotlight--overview-genre">${genre}</p>`
            : `<p class="content-spotlight--overview-genre">${genre}, &nbsp;</p>`;
        })
        .join("")}
    `;
    this.#spotlightOverviewDesc.textContent = currentContent.description;
  }

  #getNewRatingColor(rating) {
    if (rating >= 9.0) return "var(--c-rating-best)";
    else if (rating >= 8.0) return "var(--c-rating-good)";
    else if (rating >= 7.0) return "var(--c-rating-okay)";
    else if (rating >= 6.0) return "var(--c-rating-bad)";
    else return "var(--c-rating-worst)";
  }
}

export default new SpotlightOverviewView();
