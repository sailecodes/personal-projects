class SpotlightTrailerView {
  #trailerBtns;
  #trailerPlayingFlag;
  #spotlightBtns;
  #spotlightMarkerContainer;

  initVars() {
    this.#trailerBtns = document.querySelectorAll(".content-spotlight--trailer-btn");
    this.#trailerPlayingFlag = false;
    this.#spotlightBtns = document.querySelectorAll(".content-spotlight--btn");
    this.#spotlightMarkerContainer = document.querySelector(".content-spotlight--markers");
  }

  initHandlers() {
    this.addOnTrailerBtnClickedHandler();
    this.addOnSpotlightBtnClickedHandler();
    this.addOnArrowKeyClickedHandler();
    this.addOnMarkerClickedHandler();
  }

  addOnTrailerBtnClickedHandler() {
    this.#trailerBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const trailerIF = e.currentTarget
          .closest(".content-spotlight--main-content")
          .querySelector(".content-spotlight--trailer");
        const trailerBtnText = e.currentTarget.querySelector(".content-spotlight--trailer-text");

        if (this.#trailerPlayingFlag) {
          this.#changeTrailerAttributes(trailerIF, trailerBtnText, true);
          trailerIF.contentWindow.postMessage('{"event":"command", "func":"stopVideo", "args":""}', "*");
        } else {
          this.#changeTrailerAttributes(trailerIF, trailerBtnText, false);
        }

        this.#trailerPlayingFlag = !this.#trailerPlayingFlag;
      });
    });
  }

  addOnSpotlightBtnClickedHandler() {
    this.#spotlightBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        this.#resetTrailerOnTransition();
      });
    });
  }

  addOnArrowKeyClickedHandler() {
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        this.#resetTrailerOnTransition();
      }
    });
  }

  addOnMarkerClickedHandler() {
    this.#spotlightMarkerContainer.addEventListener("click", (e) => {
      this.#resetTrailerOnTransition();
    });
  }

  #resetTrailerOnTransition() {
    const activeSlide = document.querySelector(".content-spotlight--marker-active").dataset.slide;
    const prevContent = document.querySelectorAll(".content-spotlight--main-content")[activeSlide];
    const trailerIF = prevContent.querySelector(".content-spotlight--trailer");
    const trailerBtnText = prevContent.querySelector(".content-spotlight--trailer-text");

    this.#changeTrailerAttributes(trailerIF, trailerBtnText, true);

    this.#trailerPlayingFlag = false;
  }

  #changeTrailerAttributes(trailerIF, trailerBtnText, attrFlag) {
    trailerBtnText.textContent = attrFlag ? "Watch trailer" : "Stop trailer";

    this.#changeTrailerIcon(trailerBtnText, attrFlag);

    trailerIF.style.transitionDuration = attrFlag ? "0.1s" : "1s";
    trailerIF.style.transitionDelay = attrFlag ? "0s" : "1s";
    trailerIF.style.opacity = attrFlag ? "0" : "1";

    trailerIF.allow = attrFlag ? "" : "autoplay";
    trailerIF.src = attrFlag ? trailerIF.src : trailerIF.src.concat("&autoplay=1");
  }

  #changeTrailerIcon(trailerBtnText, trailerFlag) {
    const trailerBtn = trailerBtnText.closest(".content-spotlight--trailer-btn");
    const trailerIcon = trailerBtn.querySelector(".content-spotlight--text-icon");

    trailerBtn.removeChild(trailerIcon);
    trailerBtn.insertAdjacentHTML(
      "beforeend",
      trailerFlag
        ? `<svg
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
          </svg>`
        : `<svg
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
              d="M9 9.563C9 9.252 9.252 9 9.563 9h4.874c.311 0 .563.252.563.563v4.874c0 .311-.252.563-.563.563H9.564A.562.562 0 019 14.437V9.564z" />
          </svg>`
    );
  }
}

export default new SpotlightTrailerView();
