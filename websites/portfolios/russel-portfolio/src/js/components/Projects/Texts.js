import "../../../css/Projects/Text.css";

import Roles from "./Roles";

const Texts = ({ title, description, contributions }) => {
  const onMouseOverHandler = (e) => {
    const btn = e.target.closest("button");

    if (btn) {
      const underline = btn.nextElementSibling.nextElementSibling;
      underline.style.borderWidth = "0.1rem";
      underline.style.width = "6.5rem";
    }
  };

  const onMouseLeaveHandler = (e) => {
    const btn = e.target.closest("button");

    if (btn) {
      const underline = btn.nextElementSibling.nextElementSibling;
      underline.style.borderWidth = "0";
      underline.style.width = "0";
    }
  };

  const onBtnClickHandler = (e) => {
    const detailsContainer = e.target.closest(".Projects--details-container");

    if (detailsContainer) {
      const introContainer = detailsContainer.querySelector(".Projects--intro-container");
      const rolesContainer = detailsContainer.querySelector(".Projects--roles-container");

      introContainer.style.transform = "translateY(-100%)";
      rolesContainer.style.transform = "translateY(-100%)";
    }
  };

  return (
    <div className="Projects--details-container">
      <div className="Projects--intro-container">
        <p className="Projects--name">{title}</p>
        <p className="Projects--description">{description}</p>
        <div>
          <button
            onMouseOver={onMouseOverHandler}
            onMouseLeave={onMouseLeaveHandler}
            onClick={onBtnClickHandler}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75"
              />
            </svg>
          </button>
          <p>Contributions</p>
          <div className="Projects--underline"></div>
        </div>
      </div>
      <Roles contributions={contributions} />
    </div>
  );
};

export default Texts;
