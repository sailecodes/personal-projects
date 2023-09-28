class SpotlightView {
  #spotlightBtn = document.querySelectorAll(".content-spotlight--btn");
  #sliderElements = document.querySelectorAll(".content-spotlight--main-content");
  #sliderMaxElements = this.#sliderElements.length;
  #markerContainer = document.querySelector(".content-spotlight--markers");

  initHandlers() {
    this.#addSliderMoveHandler();
  }

  initDefaultState() {
    this.#initMarkers();
  }

  #addSliderMoveHandler() {
    this.#spotlightBtn.forEach((element) => {
      element.addEventListener("click", function (e) {
        if (e.currentTarget.classList.contains("content-spotlight--left-btn")) {
          console.log("LEFT BUTTON CLICKED");
        } else if (e.currentTarget.classList.contains("content-spotlight--right-btn")) {
          console.log("RIGHT BUTTON CLICKED");
        }
      });
    });
  }

  #initMarkers() {
    this.#sliderElements.forEach(this.#initMarkersHelper.bind(this));
  }

  #initMarkersHelper(value, index) {
    this.#markerContainer.insertAdjacentHTML("beforeend", `<div class="content-spotlight--marker"></div>`);
  }

  #activateMarker(slide) {}

  #transitionNextSlide() {}
}

export default new SpotlightView();
