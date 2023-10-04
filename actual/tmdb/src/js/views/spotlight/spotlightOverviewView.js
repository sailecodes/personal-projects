import { SO_TITLE_MAX_WIDTH, SO_CTITLE_TRANS_DURATION_RATIO, SO_CTITLE_TRANS_DELAY_OFFSET } from "../../config.js";

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
            )};">${this.#convertToNumWithDecimalPlace(initialContent.rating, 1)}</p>
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
   * Makes the title transition towards the default position after clipped animation
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

    const transitionDuration = Math.ceil(
      this.#spotlightOverviewTitleClipCntr.scrollWidth / SO_CTITLE_TRANS_DURATION_RATIO
    );

    this.#spotlightOverviewTitle.style.transitionDuration = `${transitionDuration}s`;

    const textWidth = this.#calcTitleWidth();
    const leftOver = ((textWidth - SO_TITLE_MAX_WIDTH) / SO_TITLE_MAX_WIDTH) * 100;

    this.#spotlightOverviewTitle.style.left = `-${leftOver}%`;
    this.#clippedTitleAnimId = setTimeout(
      () => this.#spotlightOverviewTitle.dispatchEvent(this.#CustomEventClippedTitleAnimDone),
      `${transitionDuration * 1000 + SO_CTITLE_TRANS_DELAY_OFFSET}`
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
   */
  addOnSpotlightBtnClickedHandler() {
    document.querySelectorAll(".content-spotlight--btn").forEach((button) => {
      button.addEventListener("click", () => {
        this.#resetSpotlightAndOverview();
      });
    });
  }

  /**
   * Similar functionality to this.addOnSpotlightBtnClickedHandler() but upon clicking the left and right arrow keys
   */
  addOnArrowKeyClickedHandler() {
    document.addEventListener("keydown", () => {
      this.#resetSpotlightAndOverview();
    });
  }

  /**
   * Similar functionality to this.addOnSpotlightBtnClickedHandler() but upon clicking a marker
   */
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

    // Note: Must execute code below (i.e. transition = 'none') to avoid not moving clipped titles immediately to
    //       the default position because the duration property is always set for clipped titles
    this.#spotlightOverviewTitle.style.transition = "none";
    this.#spotlightOverviewTitle.style.left = "-0.5%";

    // Note: Must execute after some time to avoid conflict between transition = 'none' and transition = '...'
    setTimeout(() => {
      this.#spotlightOverviewTitle.style.transitionProperty = "left";
      this.#spotlightOverviewTitle.style.transitionDelay = "1.5s";
      this.#spotlightOverviewTitle.style.transitionTimingFunction = "cubic-bezier(1, 1, 1, 1)";
    }, 100);
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
    this.#spotlightOverviewRating.textContent = this.#convertToNumWithDecimalPlace(Number(currentContent.rating), 1);
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

  #convertToNumWithDecimalPlace(num, decimalPlaces) {
    return (Math.round(num * 10) / 10).toFixed(decimalPlaces);
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
