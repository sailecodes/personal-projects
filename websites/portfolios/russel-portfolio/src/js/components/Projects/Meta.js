import projectData from "../../data/projectData";

import Text from "./Text";
import Visual from "./Visual";
import Btns from "./Btns";

const Meta = () => {
  return (
    <>
      {projectData.map((data) => (
        <div
          key={data.title}
          className="Projects--meta-container">
          <Text
            title={data.title}
            description={data.description}
          />
          <div
            className="Projects--visual-container"
            data-lowest-pos={(data.imgPaths.length - 1) * -104}
            data-highest-pos={(data.imgPaths.length - 1) * 104}>
            {data.imgPaths.map((path, index) => (
              <Visual
                key={path}
                title={data.title}
                path={path}
                index={index}
                length={data.imgPaths.length - 1}
              />
            ))}
          </div>
          <Btns />
        </div>
      ))}
    </>
  );
};

export default Meta;
