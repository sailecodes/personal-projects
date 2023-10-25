import "../../../css/Projects/Projects.css";

import { Routes, Route } from "react-router-dom";

import Metas from "./Metas";

const Projects = () => {
  return (
    <div className="Projects--container">
      <main
        className="Projects"
        id="Projects">
        <Routes>
          <Route
            index
            element={<Metas />}
          />
        </Routes>
      </main>
    </div>
  );
};

export default Projects;
