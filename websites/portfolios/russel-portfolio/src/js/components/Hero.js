import "../../css/Hero.css";

const Hero = () => {
  return (
    <div className="Hero--container">
      <section className="Hero">
        <img
          src="./img/pf/tmp-pf.jpg"
          alt="Russel Koh headshot"
          className="Hero--pf"
        />
        <div className="Hero--meta-container">
          <p className="Hero--intro">
            <strong>Hi, I'm Russel Koh!</strong>
          </p>
          <p className="Hero--description">
            I'm a passionate <em>_</em> at Blizzard Entertainment with an aspiration for{" "}
            <strong>
              <em>game design</em>
            </strong>{" "}
            and{" "}
            <strong>
              <em>development</em>
            </strong>
            . Yes, I love video games.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Hero;
