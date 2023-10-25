import projectData from "../../data/projectData";

import { Routers, Router } from "react-router-dom";

import Texts from "./Texts";
import Visuals from "./Visuals";
import Details from "./Details";
import Btns from "./Btns";

const Metas = () => {
  return (
    <>
      {projectData.map((data) => (
        <div
          key={data.title}
          className="Projects--meta-container">
          <Texts
            title={data.title}
            description={data.description}
          />
          <Visuals
            imgPaths={data.imgPaths}
            numImgs={data.imgPaths.length - 1}
            title={data.title}
          />
          <Btns />
        </div>
      ))}
    </>
  );
};

export default Metas;
