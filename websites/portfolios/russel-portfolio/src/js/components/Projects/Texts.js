import "../../../css/Projects/Text.css";

import { Link } from "react-router-dom";

const Texts = (props) => {
  const onMouseOverHandler = (e) => {
    const link = e.target.closest("a");

    if (link) {
      const underline = link.nextElementSibling;
      underline.style.borderWidth = "0.1rem";
      underline.style.width = "6.229rem";
    }
  };

  const onMouseLeaveHandler = (e) => {
    const link = e.target.closest("a");

    link.addEventListener("mouseleave", () => {
      const underline = link.nextElementSibling;
      underline.style.borderWidth = "0";
      underline.style.width = "0";
    });
  };

  return (
    <div className="Projects--text-container">
      <p className="Projects--name">{props.title}</p>
      <p className="Projects--description">{props.description}</p>
      <div>
        <Link
          onMouseOver={onMouseOverHandler}
          onMouseLeave={onMouseLeaveHandler}>
          <em>Read more</em>
        </Link>
        <div className="Projects--underline"></div>
      </div>
    </div>
  );
};

export default Texts;
