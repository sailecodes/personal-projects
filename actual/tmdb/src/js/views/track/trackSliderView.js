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

  /**
   * Initializes class variables
   */
  initVars() {
    this.#trackParent = document.querySelector(".content-tracks");
    this.#trackSections = document.querySelectorAll(".content-tracks--section");
  }

  /**
   * Initializes class handlers
   */
  initHandlers() {
    this.handleSliderHovered();
    this.handleSliderBtnClicked();
    this.handleSliderBtnHovered();
  }

  /**
   * Handles the visibility of the shadows when hovering over a track button
   */
  handleSliderBtnHovered() {
    this.#trackParent.addEventListener("mouseover", (e) => {
      const btn = e.target.closest(".content-tracks--btn");

      if (btn) {
        if (btn.classList.contains("content-tracks--left-btn")) {
          this.#addBtnHoverShadow(btn, false, true);
        } else if (btn.classList.contains("content-tracks--right-btn")) {
          this.#addBtnHoverShadow(btn, true, true);
        }
      }
    });

    this.#trackParent.addEventListener("mouseout", (e) => {
      const btn = e.target.closest(".content-tracks--btn");

      if (btn) {
        if (btn.classList.contains("content-tracks--left-btn")) {
          this.#addBtnHoverShadow(btn, false, false);
        } else if (btn.classList.contains("content-tracks--right-btn")) {
          this.#addBtnHoverShadow(btn, true, false);
        }
      }
    });
  }

  #addBtnHoverShadow(btn, btnFlag, toggleFlag) {
    const trackSliderShadow = btn
      .closest(".content-tracks--section")
      .querySelector(btnFlag ? ".slider-shadow-right-sm" : ".slider-shadow-left-sm");

    trackSliderShadow.style.width = toggleFlag ? "3rem" : "0rem";
  }

  /**
   *  Handles the visibility of the track markers
   */
  handleSliderHovered() {
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
  handleSliderBtnClicked() {
    this.#trackParent.addEventListener("click", (e) => {
      const btn = e.target.closest(".content-tracks--btn");

      if (btn) {
        if (btn.classList.contains("content-tracks--left-btn")) {
          this.#disableContentHover(btn);
          this.#toggleMarker(btn, false);
          this.#displayNextBatch(btn, false);
        } else if (btn.classList.contains("content-tracks--right-btn")) {
          const leftBtn = btn.previousElementSibling;
          leftBtn.style.opacity = "1";

          this.#disableContentHover(btn);
          this.#toggleMarker(btn, true);
          this.#displayNextBatch(btn, true);
        }
      }
    });
  }

  #disableContentHover(btn) {
    const sliderContents = btn
      .closest(".content-tracks--section")
      .querySelectorAll(".content-tracks--section-slider-content");
    const btns = btn.closest(".content-tracks--section").querySelectorAll(".content-tracks--btn");

    sliderContents.forEach((sliderContent) => {
      sliderContent.style.pointerEvents = "none";

      setTimeout(() => {
        sliderContent.style.pointerEvents = "auto";
      }, 2200);
    });

    btns.forEach((btn) => {
      btn.style.pointerEvents = "none";

      setTimeout(() => {
        btn.style.pointerEvents = "auto";
      }, 2200);
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

  #displayNextBatch(btn, dirFlag) {
    const slider = dirFlag ? btn.previousElementSibling.previousElementSibling : btn.previousElementSibling;
    const sliderContent = Array.from(slider.querySelectorAll(".content-tracks--section-slider-content"));

    sliderContent.forEach((content) => {
      const oldTranslateVal = this.#getOldTranslateVal(content.style.transform);
      const tempNewTranslateVal = this.#getTempNewTranslateVal(oldTranslateVal, dirFlag);

      content.style.transform = `translateX(${tempNewTranslateVal}%)`;

      if (tempNewTranslateVal === TRACK_LEFT_INVIS_MIN_POS || tempNewTranslateVal === TRACK_RIGHT_INVIS_MIN_POS) {
        this.#toggleBrightness(content, true);
      } else {
        this.#toggleBrightness(content, false);
      }

      if (dirFlag) {
        if (oldTranslateVal < TRACK_LEFT_INVIS_MIN_POS) {
          this.#shiftToNewLoc(content, tempNewTranslateVal, dirFlag);
        } else if (oldTranslateVal === 1985.5) {
          this.#shiftToNewLoc(content, tempNewTranslateVal, false);
        }
      } else {
        if (oldTranslateVal > TRACK_RIGHT_INVIS_MIN_POS) {
          this.#shiftToNewLoc(content, tempNewTranslateVal, dirFlag);
        }
      }
    });
  }

  #toggleBrightness(content, toggleFlag) {
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

  #shiftToNewLoc(content, tempNewTranslateVal, dirFlag) {
    const actualNewTranslateVal = dirFlag
      ? tempNewTranslateVal + TRACK_CONTENT_FULL_TRANSLATEX_VAL
      : tempNewTranslateVal - TRACK_CONTENT_FULL_TRANSLATEX_VAL;

    content.style.opacity = "0";
    content.style.transform = `translateX(${actualNewTranslateVal}%)`;

    setTimeout(() => {
      content.style.opacity = "1";
    }, 2000);
  }
}

export default new TrackSliderView();
