import "../../css/Projects.css";
import projectData from "../data/projectData";

const Projects = () => {
  console.log(projectData);

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
              <button className="Projects--arrow-btn Projects--arrow-btn-left">
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
              <button className="Projects--arrow-btn Projects--arrow-btn-right">
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
                  className="Projects--img-container"
                  style={{ transform: "translateX(" + index * 102.56 + "%)" }}>
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
