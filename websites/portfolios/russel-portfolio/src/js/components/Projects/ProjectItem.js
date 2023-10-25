import "./../../../css/Projects/ProjectItem.css";

import Texts from "./Texts";
import Visuals from "./Visuals";
import Btns from "./Btns";

const ProjectItem = ({ data }) => {
  return (
    <div
      key={data.title}
      className="Projects--item-container">
      <Texts
        title={data.title}
        description={data.description}
        contributions={data.contributions}
      />
      <Visuals
        imgPaths={data.imgPaths}
        numImgs={data.imgPaths.length - 1}
        title={data.title}
      />
      <Btns />
    </div>
  );
};

export default ProjectItem;
