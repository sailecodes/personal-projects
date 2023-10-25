const Visuals = (props) => {
  return (
    <div
      className="Projects--visual-container"
      data-lowest-pos={props.numImgs * -104}
      data-highest-pos={props.numImgs * 104}>
      {props.imgPaths.map((path, index) => (
        <div
          className={
            "Projects--img-container" +
            (index === 0
              ? " Projects--img-container-first"
              : index === props.numImgs
              ? " Projects--img-container-last"
              : "")
          }
          style={{ transform: "translateX(" + index * 104 + "%)" }}>
          <img
            className="Projects--img"
            src={path}
            alt={props.title}
          />
        </div>
      ))}
    </div>
  );
};

export default Visuals;
