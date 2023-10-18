class TrackOverviewView {
  #sliderContents;
  #enlargeContentDelayIds;
  #currContentHoveredPos;
  #prevContentSliderHovered;
  #hasHovered;
  #resetDelayFinished;

  /**
   * Initializes class variables
   */
  initVars() {
    this.#sliderContents = document.querySelectorAll(".content-tracks--section-slider-content");
    this.#enlargeContentDelayIds = [];
  }

  /**
   * Initializes class handlers
   */
  initHandlers() {
    this._handleMetaBtnIconClicked();
    this._handleContentHoverState();
  }

  /**
   * Handles displaying the description or trailer for a track content depending on which
   * button is clicked
   *
   * Note: Could be divided into separate functions but maintained for efficiency
   */
  _handleMetaBtnIconClicked() {
    this.#sliderContents.forEach((sliderContent) => {
      sliderContent.addEventListener("click", (e) => {
        if (e.target.closest(".content-tracks--overview-btn")) {
          const overviewMeta = e.target.closest(".content-tracks--overview-meta");

          if (e.target.closest(".content-tracks--overview-desc-btn")) {
            const minHeightFlag = overviewMeta.style.minHeight === "9rem";

            overviewMeta.style.minHeight = minHeightFlag ? "3.5rem" : "9rem";
          } else if (e.target.closest(".content-tracks--overview-trailer-btn")) {
            const trailerIframe = sliderContent.querySelector(".content-tracks--trailer");
            const trailerIframeAttrFlag = trailerIframe.allow === "autoplay";

            this.#changeTrailerBtnIcon(e.target, trailerIframeAttrFlag);

            trailerIframe.style.transitionDuration = trailerIframeAttrFlag ? "0.1s" : "1s";
            trailerIframe.style.transitionDelay = trailerIframeAttrFlag ? "0s" : "1s";
            trailerIframe.style.opacity = trailerIframeAttrFlag ? "0" : "1";

            trailerIframe.allow = trailerIframeAttrFlag ? "" : "autoplay";
            trailerIframe.src = trailerIframeAttrFlag ? trailerIframe.src : trailerIframe.src.concat("&autoplay=1");
          }
        }
      });
    });
  }

  /**
   * Handles enlarging and shrinking track content depending on hover state
   *
   * Note: Could be divided into separate functions but maintained for efficiency
   */
  _handleContentHoverState() {
    for (let i = 0; i < this.#sliderContents.length; i++) {
      const sliderContent = this.#sliderContents[i];
      let overviewDelayResetId;

      // Handles enlarging a track content that is being hovered
      sliderContent.addEventListener("mouseenter", async () => {
        const currTransformVal = this.#getTransformVal(sliderContent.style.transform);

        if (currTransformVal < 0 || currTransformVal > 418) return;

        const currContentSliderHovered = Number(
          sliderContent.closest(".content-tracks--section-slider").dataset.sectionSlider
        );

        if (sliderContent.style.transform.includes("scale(1.3)")) {
          return;
        } else if (this.#hasHovered) {
          if (
            !this.#resetDelayFinished &&
            this.#currContentHoveredPos !== currTransformVal &&
            this.#prevContentSliderHovered === currContentSliderHovered
          ) {
            await this.#delay(401);

            if (!sliderContent.matches(":hover") || sliderContent.style.transform.includes("scale(1.3)")) {
              return;
            }
          }
        }

        this.#enlargeContentDelayIds.forEach((id) => {
          clearTimeout(id);
        });

        clearTimeout(overviewDelayResetId);

        this.#prevContentSliderHovered = currContentSliderHovered;
        this.#currContentHoveredPos = currTransformVal;
        this.#hasHovered = true;

        sliderContent.style.zIndex = "48";
        sliderContent.style.transition = "filter 0.8s, transform 1.2s cubic-bezier(0.17, 0.84, 0.44, 1)";
        sliderContent.style.transformOrigin =
          currTransformVal === 0 ? "left" : currTransformVal === 418 ? "right" : "center";
        sliderContent.style.transform = sliderContent.style.transform.concat(" scale(1.3)");

        const overviewImg = sliderContent.querySelector(".content-tracks--overview-img");
        overviewImg.style.borderRadius = "4px 4px 0 0";

        const overviewMeta = sliderContent.querySelector(".content-tracks--overview-meta");
        overviewMeta.style.opacity = "1";
        overviewMeta.style.pointerEvents = "auto";
      });

      // Handles shrinking a track content that is no longer hovered
      sliderContent.addEventListener("mouseleave", () => {
        if (!sliderContent.style.transform.includes("scale(1.3)")) return;

        const currTransformVal = this.#getTransformVal(sliderContent.style.transform);

        if (currTransformVal < 0 || currTransformVal > 418) return;

        this.#resetTrailerFeatures(sliderContent);

        const currTransformStr = sliderContent.style.transform;
        sliderContent.style.transform = currTransformStr.slice(0, currTransformStr.indexOf(" "));
        sliderContent.style.transition = "filter 0.8s, transform 0.6s cubic-bezier(0.17, 0.84, 0.44, 1)";

        const overviewImg = sliderContent.querySelector(".content-tracks--overview-img");
        overviewImg.style.borderRadius = "4px";

        const overviewMeta = sliderContent.querySelector(".content-tracks--overview-meta");
        overviewMeta.style.minHeight = "3.5rem";
        overviewMeta.style.opacity = "0";
        overviewMeta.style.pointerEvents = "none";

        const overviewMetaDesc = overviewMeta.querySelector(".content-tracks--overview-desc");
        overviewMetaDesc.scrollTo(0, 0);

        this.#resetDelayFinished = false;

        overviewDelayResetId = setTimeout(() => {
          sliderContent.style.zIndex = "47";
          sliderContent.style.transition = "filter 0.8s, transform 2.5s cubic-bezier(0.17, 0.84, 0.44, 1)";

          this.#resetDelayFinished = true;
        }, 400);
      });
    }
  }

  #resetTrailerFeatures(sliderContent) {
    const overviewTrailerBtn = sliderContent.querySelector(".content-tracks--overview-trailer-btn");

    this.#changeTrailerBtnIcon(overviewTrailerBtn, true);

    const trailerIframe = sliderContent.querySelector(".content-tracks--trailer");

    trailerIframe.style.transitionDuration = "0.1s";
    trailerIframe.style.transitionDelay = "0s";
    trailerIframe.style.opacity = "0";

    trailerIframe.allow = "";
    trailerIframe.src = trailerIframe.src;
  }

  #changeTrailerBtnIcon(element, trailerIframeAttrFlag) {
    const overviewTrailerBtn = element.closest(".content-tracks--overview-trailer-btn");

    overviewTrailerBtn.innerHTML = "";
    overviewTrailerBtn.insertAdjacentHTML(
      "beforeend",
      trailerIframeAttrFlag
        ? `<svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="content-tracks--overview-btn-icon content-tracks--overview-trailer-btn-icon">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" />
          </svg>`
        : `<svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="content-tracks--overview-btn-icon content-tracks--overview-trailer-btn-icon">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 9.563C9 9.252 9.252 9 9.563 9h4.874c.311 0 .563.252.563.563v4.874c0 .311-.252.563-.563.563H9.564A.562.562 0 019 14.437V9.564z" />
          </svg>`
    );
  }

  #getTransformVal(transformStr) {
    return Number(transformStr.slice(11, transformStr.indexOf("%")));
  }

  #delay(time) {
    return new Promise((resolve) => {
      const enlargeContentDelayId = setTimeout(() => resolve(), time);
      this.#enlargeContentDelayIds.push(enlargeContentDelayId);
    });
  }
}

export default new TrackOverviewView();
