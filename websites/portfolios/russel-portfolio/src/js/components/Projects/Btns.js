const Btns = () => {
  const getCurrTransformVal = (imgContainer) => {
    const currTransformStr = imgContainer.style.transform;
    return +currTransformStr.slice(11, currTransformStr.indexOf("%"));
  };

  const transitionSlide = (metaContainer, directionFlag) => {
    metaContainer.querySelectorAll(".Projects--img-container").forEach((imgContainer) => {
      const currTransformVal = getCurrTransformVal(imgContainer);
      const newTransformVal = directionFlag ? currTransformVal - 104 : currTransformVal + 104;

      if (imgContainer.classList.contains("Projects--img-container-first") && newTransformVal === 0) {
        metaContainer.querySelector(".Projects--arrow-btn-left").classList.toggle("Projects--arrow-btn-active");
      } else if (imgContainer.classList.contains("Projects--img-container-last") && newTransformVal === 0) {
        metaContainer.querySelector(".Projects--arrow-btn-right").classList.toggle("Projects--arrow-btn-active");
      }

      imgContainer.style.transform = directionFlag
        ? `translateX(${newTransformVal}%)`
        : `translateX(${newTransformVal}%)`;
    });
  };

  const arrowBtnClickHandler = (e) => {
    const btn = e.target.closest(".Projects--arrow-btn-left") || e.target.closest(".Projects--arrow-btn-right");

    if (!btn) return;

    const metaContainer = btn.closest(".Projects--meta-container");

    if (btn.classList.contains("Projects--arrow-btn-left")) {
      const currTransformValFirst = getCurrTransformVal(metaContainer.querySelector(".Projects--img-container-first"));

      if (currTransformValFirst === 0) return;

      metaContainer.querySelector(".Projects--arrow-btn-right").classList.add("Projects--arrow-btn-active");
      transitionSlide(metaContainer, false);
    } else if (btn.classList.contains("Projects--arrow-btn-right")) {
      const currTransformValLast = getCurrTransformVal(metaContainer.querySelector(".Projects--img-container-last"));

      if (currTransformValLast === 0) return;

      metaContainer.querySelector(".Projects--arrow-btn-left").classList.add("Projects--arrow-btn-active");
      const leftBtn = btn.previousElementSibling;
      leftBtn.classList.add("Projects--arrow-btn-active");
      transitionSlide(metaContainer, true);
    }
  };

  return (
    <>
      <button
        className="Projects--arrow-btn Projects--arrow-btn-left"
        onClick={arrowBtnClickHandler}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      </button>
      <button
        className="Projects--arrow-btn Projects--arrow-btn-right Projects--arrow-btn-active"
        onClick={arrowBtnClickHandler}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </button>
    </>
  );
};

export default Btns;
