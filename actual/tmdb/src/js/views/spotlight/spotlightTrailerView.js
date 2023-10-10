class SpotlightTrailerView {
  #trailerBtns;
  #trailerPlayingFlag;
  #spotlightBtns;

  initVars() {
    this.#trailerBtns = document.querySelectorAll(".content-spotlight--trailer-btn");
    this.#trailerPlayingFlag = false;
    this.#spotlightBtns = document.querySelectorAll(".content-spotlight--btn");
  }

  addOnTrailerBtnClickedHandler() {
    this.#trailerBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        console.log(e.target, e.currentTarget);
        const trailerIF = e.currentTarget
          .closest(".content-spotlight--main-content")
          .querySelector(".content-spotlight--trailer");
        const trailerBtnText = e.currentTarget.querySelector(".content-spotlight--trailer-text");

        if (this.#trailerPlayingFlag) {
          this.#resetTrailer(trailerIF, trailerBtnText);
        } else {
          this.#playTrailer(trailerIF, trailerBtnText);
        }

        this.#trailerPlayingFlag = !this.#trailerPlayingFlag;
      });
    });
  }

  addOnSpotlightBtnClickedHandler() {
    this.#spotlightBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        setTimeout(() => {
          const activeSlide = document.querySelector(".content-spotlight--marker-active").dataset.slide;
          const mainContent = document.querySelectorAll(".content-spotlight--main-content")[activeSlide];
          const trailerIF = mainContent.querySelector(".content-spotlight--trailer");
          const trailerBtnText = mainContent.querySelector(".content-spotlight--trailer-text");

          this.#resetTrailer(trailerIF, trailerBtnText);
        }, 100);
      });
    });
  }

  #resetTrailer(trailerIF, trailerBtnText) {
    trailerBtnText.textContent = "Watch trailer";
    this.#changeStyleAttributes(trailerIF);
    trailerIF.contentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}', "*");
  }

  #playTrailer(trailerIF, trailerBtnText) {
    trailerBtnText.textContent = "Pause trailer";
    this.#changeStyleAttributes(trailerIF);
    trailerIF.allow = "autoplay";
    trailerIF.src = trailerIF.src.includes("&autoplay=1") ? trailerIF.src : trailerIF.src.concat("&autoplay=1");
  }

  #changeStyleAttributes(trailerIF) {
    trailerIF.style.transitionDuration = this.#trailerPlayingFlag ? "0.1s" : "1s";
    trailerIF.style.transitionDelay = this.#trailerPlayingFlag ? "0s" : "1s";
    trailerIF.style.opacity = this.#trailerPlayingFlag ? "0" : "1";
  }
}

export default new SpotlightTrailerView();
