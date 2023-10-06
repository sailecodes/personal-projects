import { TRACK_CONTENT_TRANSLATE_VAL, TRACK_CONTENT_BATCH_NUM } from "../../config.js";

class TrackSliderView {
  #trackParent;
  #trackSections;

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
   *
   * Note: Clicking a button too fast (from rendering) results in e.target === <path ... />
   */
  addOnSliderBtnClickHandler() {
    this.#trackParent.addEventListener("click", (e) => {
      const btn = e.target.closest(".content-tracks--btn");

      if (btn) {
        if (btn.classList.contains("content-tracks--left-btn")) {
          console.log("left btn clicked");

          this.#toggleMarker(btn, false);
          // this.#nextContentBatch(btn, false);
        } else if (btn.classList.contains("content-tracks--right-btn")) {
          console.log("right btn clicked");

          this.#toggleMarker(btn, true);
          this.#insertSliderLeftBtn(btn);
          // this.#nextContentBatch(btn, true);
        }
      }
    });
  }

  #toggleMarker(btn, dirFlag) {
    const markers = btn.closest(".content-tracks--section").querySelectorAll(".content-tracks--section-slider-marker");
    let activeMarkerInd = 0;

    markers.forEach((marker, index) => {
      if (marker.classList.contains("content-tracks--section-slider-marker-active")) {
        activeMarkerInd = dirFlag ? (index + 1) % 4 : (index + 3) % 4;
      }
      marker.classList.remove("content-tracks--section-slider-marker-active");
    });

    markers[activeMarkerInd].classList.add("content-tracks--section-slider-marker-active");
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

    sliderContent.forEach((content, index) => {
      const prevTranslateVal = Number(this.#getTranslatePercentage(content.style.transform));

      // if (prevTranslateVal < 0) {
      //   setTimeout(() => {
      //     content.style.transform = `translateX(${prevTranslateVal + 1045}%)`;
      //   }, 1500); // FIXME: temp time
      // } else {
      //   const num = prevTranslateVal - 522.5;
      //   content.style.transform = `translateX(${num}%)`;

      //   if (num < -104.5) {
      //     setTimeout(() => {
      //       content.style.transition = "none";
      //       content.style.opacity = "0";
      //       content.style.transform = `translateX(${num + 1045}%)`;
      //       setTimeout(() => {
      //         content.style.transition = "transform 10s";
      //         content.style.opacity = "1";
      //       }, 500);
      //     }, 2000);
      //   }
      // }

      // content.style.transform = `translateX(${prevTranslateVal - TRACK_CONTENT_TRANSLATE_VAL}%)`;

      // const newTranslateVal = this.#getShiftedTranslatePercentage(prevTranslateVal, dirFlag);

      // content.style.transform = `translateX(${newTranslateVal}%)`;
    });
  }

  #getTranslatePercentage(prevTranslateValStr) {
    const temp = prevTranslateValStr.slice(11);

    return temp.slice(0, temp.indexOf("%"));
  }

  #getShiftedTranslatePercentage(prevTranslateVal, dirFlag) {
    if (dirFlag) {
      if (prevTranslateVal >= 0) {
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
