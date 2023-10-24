import "../../css/Projects.css";

const Projects = () => {
  return (
    <div className="Projects--container">
      <main className="Projects">
        <div className="Projects--meta-container">
          <div className="Projects--text-container">
            <p className="Projects--name">Aeyos</p>
            <p className="Projects--description">
              An exciting deck-building adventure that focuses on four unique heroes with different cards and relics.
            </p>
          </div>
          <div className="Projects--visual-container">
            <img
              className="Projects--img"
              src="/img/projects/aeyos/aeyos-1.png"
              alt="Aeyos"
            />
            {/* <img
              className="Projects--img"
              src="/img/projects/aeyos/aeyos-2.png"
              alt="Aeyos"
            />
            <img
              className="Projects--img"
              src="/img/projects/aeyos/aeyos-3.png"
              alt="Aeyos"
            />
            <img
              className="Projects--img"
              src="/img/projects/aeyos/aeyos-4.png"
              alt="Aeyos"
            />
            <img
              className="Projects--img"
              src="/img/projects/aeyos/aeyos-5.png"
              alt="Aeyos"
            /> */}
          </div>
        </div>

        <div className="Projects--meta-container">Hello</div>
        <div className="Projects--meta-container">Hello</div>
      </main>
    </div>
  );
};

export default Projects;
