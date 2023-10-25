import "../../css/Projects.css";
import projectData from "../data/projectData";

const Projects = () => {
  const transitionSlide = (visContainer, directionFlag) => {
    visContainer.querySelectorAll(".Projects--img-container").forEach((imgContainer) => {
      const currTransformStr = imgContainer.style.transform;
      const currTransformVal = +currTransformStr.slice(11, currTransformStr.indexOf("%"));
      imgContainer.style.transform = directionFlag
        ? `translateX(${currTransformVal - 104}%)`
        : `translateX(${currTransformVal + 104}%)`;
    });
  };

  const arrowBtnClickHandler = (e) => {
    const btn = e.target.closest(".Projects--arrow-btn-left") || e.target.closest(".Projects--arrow-btn-right");

    if (btn.classList.contains("Projects--arrow-btn-left")) {
      const visContainer = btn.closest(".Projects--visual-container");
      transitionSlide(visContainer, false);
    } else if (btn.classList.contains("Projects--arrow-btn-right")) {
      const visContainer = btn.closest(".Projects--visual-container");
      // if (visContainer.querySelector('.'))
      const leftBtn = btn.previousElementSibling;
      leftBtn.classList.add("Projects--arrow-btn-active");
      transitionSlide(visContainer, true);
    }
  };

  return (
    <div className="Projects--container">
      <main className="Projects">
        {projectData.map((data) => (
          <div
            key={data.title}
            className="Projects--meta-container">
            <div className="Projects--text-container">
              <p className="Projects--name">{data.title}</p>
              <p className="Projects--description">{data.description}</p>
            </div>
            <div className="Projects--visual-container">
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
                className="Projects--arrow-btn Projects--arrow-btn-right"
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
              {data.imgPaths.map((path, index) => (
                <div
                  key={path}
                  className={
                    "Projects--img-container" +
                    (index === 0
                      ? " Projects--img-container-first"
                      : index === data.imgPaths.length - 1
                      ? " Projects--img-container-last"
                      : "")
                  }
                  style={{ transform: "translateX(" + index * 104 + "%)" }}>
                  <img
                    className="Projects--img"
                    src={path}
                    alt="Aeyos"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default Projects;
