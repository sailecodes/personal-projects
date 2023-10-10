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
        const trailerIF = e.currentTarget
          .closest(".content-spotlight--main-content")
          .querySelector(".content-spotlight--trailer");
        const trailerBtnText = e.currentTarget.querySelector(".content-spotlight--trailer-text");

        if (this.#trailerPlayingFlag) {
          trailerBtnText.textContent = "Watch trailer";
          this.#changeStyleAttributes(trailerIF);
          trailerIF.contentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}', "*");
        } else {
          trailerBtnText.textContent = "Pause trailer";
          this.#changeStyleAttributes(trailerIF);
          trailerIF.allow = "autoplay";
          trailerIF.src = trailerIF.src.includes("&autoplay=1") ? trailerIF.src : trailerIF.src.concat("&autoplay=1");
        }

        this.#trailerPlayingFlag = !this.#trailerPlayingFlag;
      });
    });
  }

  #changeStyleAttributes(trailerIF) {
    trailerIF.style.transitionDuration = this.#trailerPlayingFlag ? "0.1s" : "1s";
    trailerIF.style.transitionDelay = this.#trailerPlayingFlag ? "0s" : "1s";
    trailerIF.style.opacity = this.#trailerPlayingFlag ? "0" : "1";
  }

  addOnSpotlightBtnClickedHandler() {}
}

export default new SpotlightTrailerView();
