import "./../../../css/Projects/Texts.css";

import Intro from "./Intro";
import Roles from "./Roles";

const Texts = ({ title, description, contributions }) => {
  const onMouseOverHandler = (e) => {
    const btn = e.target.closest("button");

    if (btn) {
      const text = btn.nextElementSibling;
      const underline = btn.nextElementSibling.nextElementSibling;
      underline.style.borderWidth = "0.1px";
      underline.style.width = text.textContent.charAt(0) === "C" ? "6.5rem" : "3.9rem";
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

  return (
    <div className="Projects--text-container">
      <Intro
        title={title}
        description={description}
        onMouseOverHandler={onMouseOverHandler}
        onMouseLeaveHandler={onMouseLeaveHandler}
      />
      <Roles
        contributions={contributions}
        onMouseOverHandler={onMouseOverHandler}
        onMouseLeaveHandler={onMouseLeaveHandler}
      />
    </div>
  );
};

export default Texts;
