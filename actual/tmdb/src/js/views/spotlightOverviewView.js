class SpotlightOverviewView {
  initOverview() {
    // const spotlightMoreContainers = document.querySelectorAll(".content-spotlight--more-container");
    // const markers = document.querySelectorAll(".content-spotlight--marker");
    // const currentSlide = 0;
    // markers.forEach((marker) => {
    //   if (marker.classList.contains("content-spotlight--marker-active")) {
    //     console.log(marker.dataset.slide);
    //   }
    // });
  }

  initHandlers() {
    this.#addChangeOverviewFromBtnHandler();
  }

  #addChangeOverviewFromBtnHandler() {
    document.querySelectorAll(".content-spotlight--btn").forEach((button) => {
      button.addEventListener("click", (e) => {
        if (e.currentTarget.classList.contains("content-spotlight--left-btn")) this.#changeOverview(false);
        else if (e.currentTarget.classList.contains("content-spotlight--right-btn")) this.#changeOverview(true);
      });
    });
  }

  #changeOverview(buttonFlag) {
    const markers = document.querySelectorAll(".content-spotlight--marker");
    let currentSlide = 0;

    markers.forEach((marker) => {
      if (marker.classList.contains("content-spotlight--marker-active")) {
        if (!buttonFlag) currentSlide = Number(marker.dataset.slide) === 0 ? 2 : Number(marker.dataset.slide) - 1;
        else currentSlide = Number(marker.dataset.slide) === 2 ? 0 : Number(marker.dataset.slide) + 1;
      }
    });

    const currentContent = document.querySelectorAll(".content-spotlight--main-content")[currentSlide];

    // TODO: Use currentContent to changeo overview
  }
}

export default new SpotlightOverviewView();
