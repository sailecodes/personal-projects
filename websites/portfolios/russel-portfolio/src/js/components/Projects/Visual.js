const Visual = (props) => {
  return (
    <div
      className={
        "Projects--img-container" +
        (props.index === 0
          ? " Projects--img-container-first"
          : props.index === props.length
          ? " Projects--img-container-last"
          : "")
      }
      style={{ transform: "translateX(" + props.index * 104 + "%)" }}>
      <img
        className="Projects--img"
        src={props.path}
        alt={props.title}
      />
    </div>
  );
};

export default Visual;
