import projectData from "../../data/projectData";

import { useState } from "react";

import Texts from "./Texts";
import Visuals from "./Visuals";
import Details from "./Details";
import Btns from "./Btns";

const Meta = ({ data }) => {
  const [readMore, setReadMore] = useState(false);

  return (
    <div
      key={data.title}
      className="Projects--meta-container">
      {!readMore && (
        <>
          <Texts
            title={data.title}
            description={data.description}
            setReadMore={setReadMore}
          />
          <Visuals
            imgPaths={data.imgPaths}
            numImgs={data.imgPaths.length - 1}
            title={data.title}
          />
          <Btns />
        </>
      )}
      {readMore && <Details />}
    </div>
  );
};

export default Meta;
