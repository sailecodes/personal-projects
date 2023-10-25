import "../../../css/Projects/Projects.css";

import projectData from "../../data/projectData";

import Meta from "./Meta";

const Projects = () => {
  return (
    <div className="Projects--container">
      <main
        className="Projects"
        id="Projects">
        {projectData.map((data) => (
          <Meta
            key={data.title}
            data={data}
          />
        ))}
      </main>
    </div>
  );
};

export default Projects;
