import "./../../../css/Projects/Intro.css";
import "./../../../css/utilities.css";

const Intro = ({ title, description, onMouseOverHandler, onMouseLeaveHandler }) => {
  const onBtnClickHandler = (e) => {
    const textContainer = e.target.closest(".Projects--text-container");

    if (textContainer) {
      const introContainer = textContainer.querySelector(".Projects--intro-container");
      const rolesContainer = textContainer.querySelector(".Projects--roles-container");

      introContainer.style.transform = "translateY(-100%)";
      rolesContainer.style.transform = "translateY(-100%)";
    }
  };

  return (
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
        <div className="utility--underline Projects--underline-intro"></div>
      </div>
    </div>
  );
};

export default Intro;
