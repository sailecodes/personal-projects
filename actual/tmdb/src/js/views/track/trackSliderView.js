class TrackSliderView {
  #trackSections;
  #slider;
  #markerContainer;

  initVars() {
    this.#trackSections = document.querySelectorAll(".content-tracks--section");
    this.#slider = document.querySelector(".content-tracks--section-slider");
    this.#markerContainer = document.querySelector(".content-tracks--section-slider-markers");
  }

  addOnSliderHoverHandler() {
    this.#trackSections.forEach((section) => {
      section.addEventListener("mouseover", (e) => {
        section.querySelector(".content-tracks--section-slider-markers").style.visibility = "visible";
      });
    });

    this.#trackSections.forEach((section) => {
      section.addEventListener("mouseout", (e) => {
        section.querySelector(".content-tracks--section-slider-markers").style.visibility = "hidden";
      });
    });
  }
}

export default new TrackSliderView();
