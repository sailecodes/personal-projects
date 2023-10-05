class TrackSliderView {
  #trackSections;
  #sliders;
  #markerContainer;

  initVars() {
    this.#trackSections = document.querySelectorAll(".content-tracks--section");
    this.#sliders = document.querySelectorAll(".content-tracks--section-slider");
    this.#markerContainer = document.querySelector(".content-tracks--section-slider-markers");
  }

  addOnSliderHoverHandler() {
    this.#sliders.forEach((slider) => {
      slider.addEventListener("mouseenter", (e) => {
        slider.previousElementSibling.querySelector(".content-tracks--section-slider-markers").style.width = "3rem";
      });
    });

    this.#sliders.forEach((slider) => {
      slider.addEventListener("mouseleave", (e) => {
        slider.previousElementSibling.querySelector(".content-tracks--section-slider-markers").style.width = "0";
      });
    });
  }
}

export default new TrackSliderView();
