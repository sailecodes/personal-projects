import "../../css/Nav.css";

const Nav = () => {
  const onMouseOverHandler = (e) => {
    const anchor = e.target;
    const underline = anchor.nextElementSibling;

    underline.style.borderWidth = "0.5px";
    underline.style.width = anchor.textContent.charAt(0) === "P" ? "5.8rem" : "6.1rem";
  };

  const onMouseLeaveHandler = (e) => {
    const anchor = e.target;
    const underline = anchor.nextElementSibling;

    underline.style.borderWidth = "0";
    underline.style.width = "0";
  };

  return (
    <nav className="Nav">
      <div>
        <a
          href="#Projects"
          onMouseOver={onMouseOverHandler}
          onMouseLeave={onMouseLeaveHandler}>
          Projects
        </a>
        <div className="utility--underline Nav--underline-projects" />
      </div>

      <div>
        <a
          href="#Footer"
          onMouseOver={onMouseOverHandler}
          onMouseLeave={onMouseLeaveHandler}>
          Connect
        </a>
        <div className="utility--underline Nav--underline-connect" />
      </div>
    </nav>
  );
};

export default Nav;
