class SpotlightSliderView {
  #spotlightBtn;
  #sliderElements;
  #sliderMaxElements;
  #currentSlide = 0;
  #markerContainer;

  initVars() {
    this.#spotlightBtn = document.querySelectorAll(".content-spotlight--btn");
    this.#sliderElements = document.querySelectorAll(".content-spotlight--main-content");
    this.#sliderMaxElements = this.#sliderElements.length;
    this.#markerContainer = document.querySelector(".content-spotlight--markers");
  }

  initDefaultState() {
    this.#initMarkers();
    this.#activateMarkers(0);
    this.#transitionNextSlide(0);
  }

  #initMarkers() {
    this.#sliderElements.forEach((_, index) => {
      this.#markerContainer.insertAdjacentHTML(
        "beforeend",
        `<div class="content-spotlight--marker content-spotlight--marker-${index}" data-slide=${index}></div>`
      );
    });
  }

  initHandlers() {
    this.addTransitionByBtnHandler();
    this.addTransitionByKeyHandler();
    this.addTransitionByMarkerHandler();
    this.addBtnHoverShadowHandler();
  }

  addTransitionByBtnHandler() {
    this.#spotlightBtn.forEach((button) => {
      button.addEventListener("click", (e) => {
        if (e.currentTarget.classList.contains("content-spotlight--left-btn")) this.#prevSlide();
        else if (e.currentTarget.classList.contains("content-spotlight--right-btn")) this.#nextSlide();
      });
    });
  }

  addTransitionByKeyHandler() {
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") this.#prevSlide();
      else if (e.key === "ArrowRight") this.#nextSlide();
    });
  }

  addTransitionByMarkerHandler() {
    this.#markerContainer.addEventListener("click", (e) => {
      if (e.target.classList.contains("content-spotlight--marker")) {
        const slide = e.target.dataset.slide;

        this.#activateMarkers(slide);
        this.#transitionNextSlide(slide);
      }
    });
  }

  #activateMarkers(slide) {
    document
      .querySelectorAll(".content-spotlight--marker")
      .forEach((value) => value.classList.remove("content-spotlight--marker-active"));

    document
      .querySelector(`.content-spotlight--marker[data-slide="${slide}"]`)
      .classList.add("content-spotlight--marker-active");
  }

  #transitionNextSlide(slide) {
    this.#currentSlide = Number(slide);

    this.#sliderElements.forEach((value, index) => (value.style.transform = `translateX(${(index - slide) * 100}%)`));
  }

  #nextSlide() {
    if (this.#currentSlide === this.#sliderMaxElements - 1) this.#currentSlide = 0;
    else this.#currentSlide++;

    this.#activateMarkers(this.#currentSlide);
    this.#transitionNextSlide(this.#currentSlide);
  }

  #prevSlide() {
    if (this.#currentSlide === 0) this.#currentSlide = this.#sliderMaxElements - 1;
    else this.#currentSlide--;

    this.#activateMarkers(this.#currentSlide);
    this.#transitionNextSlide(this.#currentSlide);
  }

  addBtnHoverShadowHandler() {
    this.#spotlightBtn.forEach((button) => {
      button.addEventListener("mouseover", (e) => this.#addBtnHoverShadow(e, true));
    });

    this.#spotlightBtn.forEach((button) => {
      button.addEventListener("mouseout", (e) => this.#addBtnHoverShadow(e, false));
    });
  }

  #addBtnHoverShadow(e, flag) {
    if (e.currentTarget.classList.contains("content-spotlight--left-btn")) {
      document.querySelector(".slider-shadow-left-bg").style.width = flag ? "7rem" : "0rem";
    } else if (e.currentTarget.classList.contains("content-spotlight--right-btn")) {
      document.querySelector(".slider-shadow-right-bg").style.width = flag ? "7rem" : "0rem";
    }
  }
}

export default new SpotlightSliderView();
