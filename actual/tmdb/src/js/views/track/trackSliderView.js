import {
  TRACK_CONTENT_BATCH_AMT,
  TRACK_CONTENT_TRANSLATEX_VAL,
  TRACK_CONTENT_FULL_TRANSLATEX_VAL,
  TRACK_LEFT_INVIS_MIN_POS,
  TRACK_RIGHT_INVIS_MIN_POS,
} from "../../config.js";

class TrackSliderView {
  #trackParent;
  #trackSections;

  initVars() {
    this.#trackParent = document.querySelector(".content-tracks");
    this.#trackSections = document.querySelectorAll(".content-tracks--section");
  }

  initHandlers() {
    this.addOnSliderHoverHandler();
    this.addOnSliderBtnClickHandler();
  }

  /**
   *  Handles the visibility of the track markers
   */
  addOnSliderHoverHandler() {
    this.#trackSections.forEach((section) => {
      section.addEventListener("mouseenter", (e) => {
        section.querySelector(".content-tracks--section-slider-markers").style.width = "6rem";
      });
    });

    this.#trackSections.forEach((section) => {
      section.addEventListener("mouseleave", (e) => {
        section.querySelector(".content-tracks--section-slider-markers").style.width = "0";
      });
    });
  }

  /**
   * Handles the carousel functionality of each track
   *
   * Note: Clicking a button too fast (from rendering) results in e.target === <path ... />
   */
  addOnSliderBtnClickHandler() {
    this.#trackParent.addEventListener("click", (e) => {
      const btn = e.target.closest(".content-tracks--btn");

      if (btn) {
        if (btn.classList.contains("content-tracks--left-btn")) {
          this.#disableSliderBtns(btn);
          this.#toggleMarker(btn, false);
          this.#displayNextContentBatch(btn, false);
        } else if (btn.classList.contains("content-tracks--right-btn")) {
          this.#disableSliderBtns(btn);
          this.#toggleMarker(btn, true);
          this.#makeSliderLeftBtnVisible(btn);
          this.#displayNextContentBatch(btn, true);
        }
      }
    });
  }

  #disableSliderBtns(btn) {
    const btns = btn.closest(".content-tracks--section").querySelectorAll(".content-tracks--btn");

    btns.forEach((btn) => {
      btn.style.pointerEvents = "none";

      setTimeout(() => {
        btn.style.pointerEvents = "auto";
      }, 1900);
    });
  }

  #toggleMarker(btn, dirFlag) {
    const markers = btn.closest(".content-tracks--section").querySelectorAll(".content-tracks--section-slider-marker");
    let activeMarkerInd = 0;

    markers.forEach((marker, index) => {
      if (marker.classList.contains("content-tracks--section-slider-marker-active")) {
        activeMarkerInd = dirFlag ? (index + 1) % TRACK_CONTENT_BATCH_AMT : (index + 3) % TRACK_CONTENT_BATCH_AMT;
      }

      marker.classList.remove("content-tracks--section-slider-marker-active");
    });

    markers[activeMarkerInd].classList.add("content-tracks--section-slider-marker-active");
  }

  #makeSliderLeftBtnVisible(btn) {
    const leftBtn = btn.previousElementSibling;

    if (leftBtn.style.opacity === "1") return;

    leftBtn.style.opacity = "1";
    leftBtn.style.pointerEvents = "auto";
  }

  #displayNextContentBatch(btn, dirFlag) {
    const slider = dirFlag ? btn.previousElementSibling.previousElementSibling : btn.previousElementSibling;
    const sliderContent = Array.from(slider.querySelectorAll(".content-tracks--section-slider-content"));

    sliderContent.forEach((content) => {
      const oldTranslateVal = this.#getOldTranslateVal(content.style.transform);
      const tempNewTranslateVal = this.#getTempNewTranslateVal(oldTranslateVal, dirFlag);

      content.style.transform = `translateX(${tempNewTranslateVal}%)`;

      if (tempNewTranslateVal === TRACK_LEFT_INVIS_MIN_POS || tempNewTranslateVal === TRACK_RIGHT_INVIS_MIN_POS) {
        this.#toggleElementBrightness(content, true);
      } else {
        this.#toggleElementBrightness(content, false);
      }

      if (dirFlag) {
        if (oldTranslateVal < TRACK_LEFT_INVIS_MIN_POS) {
          this.#placeAtNewLoc(slider, content, tempNewTranslateVal, dirFlag);
        }
      } else {
        if (oldTranslateVal > TRACK_RIGHT_INVIS_MIN_POS) {
          this.#placeAtNewLoc(slider, content, tempNewTranslateVal, dirFlag);
        }
      }
    });
  }

  #toggleElementBrightness(content, toggleFlag) {
    if (toggleFlag) {
      setTimeout(() => {
        content.style.filter = "brightness(50%)";
      }, 1900);
    } else {
      content.style.filter = "brightness(100%)";
    }
  }

  #getOldTranslateVal(prevTranslateValStr) {
    const temp = prevTranslateValStr.slice(11);

    return Number(temp.slice(0, temp.indexOf("%")));
  }

  #getTempNewTranslateVal(oldTranslateVal, dirFlag) {
    return dirFlag ? oldTranslateVal - TRACK_CONTENT_TRANSLATEX_VAL : oldTranslateVal + TRACK_CONTENT_TRANSLATEX_VAL;
  }

  #placeAtNewLoc(slider, content, tempNewTranslateVal, dirFlag) {
    const actualNewTranslateVal = dirFlag
      ? tempNewTranslateVal + TRACK_CONTENT_FULL_TRANSLATEX_VAL
      : tempNewTranslateVal - TRACK_CONTENT_FULL_TRANSLATEX_VAL;
    const imgElement = content.querySelector("img");

    slider.insertAdjacentHTML(
      "beforeend",
      `
          <div class="content-tracks--section-slider-content" style="transform: translateX(${actualNewTranslateVal}%)">
            <img
              class="content-tracks--section-slider-content-img"
              src="${imgElement.src}"
            />
          </div>
        `
    );

    content.remove();
  }
}

export default new TrackSliderView();
