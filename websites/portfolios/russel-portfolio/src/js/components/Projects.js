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
            {/* <div className="Projects--roles-container">
              <p>Roles</p>
              <ul className="Projects--roles">
                <li>Creating gameplay elements</li>
                <li>Designing character cards and relics</li>
                <li>Balancing character skillsets</li>
                <li>Testing gameplay flow and loop</li>
              </ul>
            </div> */}
          </div>
          <div className="Projects--visual-container">
            <button className="Projects--arrow-btn Projects--arrow-btn-left">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </button>
            <button className="Projects--arrow-btn Projects--arrow-btn-right">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
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
      </main>
    </div>
  );
};

export default Projects;
