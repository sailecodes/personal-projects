class SpotlightSliderView {
  #spotlightBtn = document.querySelectorAll(".content-spotlight--btn");
  #sliderElements = document.querySelectorAll(".content-spotlight--main-content");
  #sliderMaxElements = this.#sliderElements.length;
  #currentSlide = 0;
  #markerContainer = document.querySelector(".content-spotlight--markers");

  initHandlers() {
    this.#addTransitionByBtnHandler();
    this.#addTransitionByKeyHandler();
    this.#addTransitionByMarkerHandler();
    this.#addBtnHoverShadowHandler();
  }

  #addTransitionByBtnHandler() {
    this.#spotlightBtn.forEach(this.#addTransitionByBtnCallerHelper.bind(this));
  }

  #addTransitionByBtnCallerHelper(element) {
    element.addEventListener("click", this.#addTransitionByBtn.bind(this));
  }

  #addTransitionByBtn(e) {
    if (e.currentTarget.classList.contains("content-spotlight--left-btn")) this.#prevSlide();
    else if (e.currentTarget.classList.contains("content-spotlight--right-btn")) this.#nextSlide();
  }

  #addTransitionByKeyHandler() {
    document.addEventListener("keydown", this.#addTransitionByKey.bind(this));
  }

  #addTransitionByKey(e) {
    if (e.key === "ArrowLeft") this.#prevSlide();
    else if (e.key === "ArrowRight") this.#nextSlide();
  }

  #addTransitionByMarkerHandler() {
    this.#markerContainer.addEventListener("click", this.#addTransitionByMarker.bind(this));
  }

  #addTransitionByMarker(e) {
    if (e.target.classList.contains("content-spotlight--marker")) {
      const slide = e.target.dataset.slide;

      this.#activateMarker(slide);
      this.#transitionNextSlide(slide);
    }
  }

  #addBtnHoverShadowHandler() {
    this.#spotlightBtn.forEach((button) => {
      button.addEventListener("mouseover", (e) => this.#addBtnHoverShadow(e, true));
    });

    this.#spotlightBtn.forEach((button) => {
      button.addEventListener("mouseout", (e) => this.#addBtnHoverShadow(e, false));
    });
  }

  #addBtnHoverShadow(e, flag) {
    if (e.currentTarget.classList.contains("content-spotlight--left-btn")) {
      document.querySelector(".slider-shadow-left").style.width = flag ? "7rem" : "0rem";
    } else if (e.currentTarget.classList.contains("content-spotlight--right-btn")) {
      document.querySelector(".slider-shadow-right").style.width = flag ? "7rem" : "0rem";
    }
  }

  initDefaultState() {
    this.#initMarkers();
    this.#activateMarker(0);
    this.#transitionNextSlide(0);
  }

  #initMarkers() {
    this.#sliderElements.forEach(this.#initMarkersHelper.bind(this));
  }

  #initMarkersHelper(_, index) {
    this.#markerContainer.insertAdjacentHTML(
      "beforeend",
      `<div class="content-spotlight--marker" data-slide=${index}></div>`
    );
  }

  #activateMarker(slide) {
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

    this.#activateMarker(this.#currentSlide);
    this.#transitionNextSlide(this.#currentSlide);
  }

  #prevSlide() {
    if (this.#currentSlide === 0) this.#currentSlide = this.#sliderMaxElements - 1;
    else this.#currentSlide--;

    this.#activateMarker(this.#currentSlide);
    this.#transitionNextSlide(this.#currentSlide);
  }
}

export default new SpotlightSliderView();
