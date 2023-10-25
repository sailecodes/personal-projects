import "./../../../css/Projects/Projects.css";

import projectData from "./../../data/projectData";

import ProjectItem from "./ProjectItem";

const Projects = () => {
  return (
    <div className="Projects--container">
      <main
        className="Projects"
        id="Projects">
        {projectData.map((data) => (
          <ProjectItem
            key={data.title}
            data={data}
          />
        ))}
      </main>
    </div>
  );
};

export default Projects;
