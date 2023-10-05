import { TRACK_CONTENT_TRANSLATE_VAL } from "../../config.js";

class TrackSliderView {
  #trackParent;
  #trackSections;
  // #sliders;
  // #markerContainer;

  initVars() {
    this.#trackParent = document.querySelector(".content-tracks");
    this.#trackSections = document.querySelectorAll(".content-tracks--section");
    // this.#sliders = document.querySelectorAll(".content-tracks--section-slider");
    // this.#markerContainer = document.querySelector(".content-tracks--section-slider-markers");
  }

  /**
   *
   * FIXME:
   *  (BUG) Track slider markers don't appear in-between section and buttons
   */
  addOnSliderHoverHandler() {
    this.#trackSections.forEach((section) => {
      section.addEventListener("mouseenter", (e) => {
        section.querySelector(".content-tracks--section-slider-markers").style.width = "3rem";
      });
    });

    this.#trackSections.forEach((section) => {
      section.addEventListener("mouseleave", (e) => {
        section.querySelector(".content-tracks--section-slider-markers").style.width = "0";
      });
    });
  }

  /**
   *
   * Note: Clicking a button too fast (from rendering) results in e.target === <path ... />
   */
  addOnSliderBtnClickHandler() {
    this.#trackParent.addEventListener("click", (e) => {
      const btn = e.target.closest(".content-tracks--btn");

      if (btn) {
        if (btn.classList.contains("content-tracks--left-btn")) {
          console.log("left btn clicked");

          // this.#nextContentBatch(btn, false);
        } else if (btn.classList.contains("content-tracks--right-btn")) {
          console.log("right btn clicked");

          this.#insertSliderLeftBtn(btn);
          this.#nextContentBatch(btn, true);
        }
      }
    });
  }

  #insertSliderLeftBtn(btn) {
    const leftBtn = btn.previousElementSibling;

    if (leftBtn.style.opacity === "1") return;

    console.log("inserting left btn");

    leftBtn.style.opacity = "1";
    leftBtn.style.pointerEvents = "auto";
  }

  #nextContentBatch(btn, dirFlag) {
    console.log("shifting track content");

    const slider = dirFlag ? btn.previousElementSibling.previousElementSibling : btn.previousElementSibling;
    const sliderContent = Array.from(slider.querySelectorAll(".content-tracks--section-slider-content"));

    sliderContent.forEach((content) => {
      const prevTranslateVal = this.#getTranslatePercentage(content.style.transform);
      const newTranslateVal = this.#getShiftedTranslatePercentage(Number(prevTranslateVal), dirFlag);

      content.style.transform = `translateX(${newTranslateVal}%)`;
    });
  }

  #getTranslatePercentage(prevTranslateValStr) {
    const temp = prevTranslateValStr.slice(11);

    return temp.slice(0, temp.indexOf("%"));
  }

  #getShiftedTranslatePercentage(prevTranslateVal, dirFlag) {
    if (dirFlag) {
      if (prevTranslateVal > 0) {
        return prevTranslateVal - TRACK_CONTENT_TRANSLATE_VAL;
      } else {
        return prevTranslateVal + TRACK_CONTENT_TRANSLATE_VAL;
      }
    } else {
      if (prevTranslateVal < 418) {
        return prevTranslateVal + TRACK_CONTENT_TRANSLATE_VAL;
      } else {
        return prevTranslateVal - TRACK_CONTENT_TRANSLATE_VAL;
      }
    }
  }
}

export default new TrackSliderView();
