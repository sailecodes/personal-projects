import "../../css/Hero.css";
import pf from "../../img/tmp-pf.jpg";

const Hero = () => {
  return (
    <div className="Hero--container">
      <section className="Hero">
        <img
          src={pf}
          alt="Russel Koh headshot"
          className="Hero--pf"
        />
        <div className="Hero--meta-container">
          <p className="Hero--intro">Hi, I'm Russel Koh!</p>
          <p className="Hero--description">
            I'm a <em>blank</em> at Blizzard Entertainment, an aspiring <em>blank</em>, and <em>blank</em> on the side.
            Oh, I love gaming too.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Hero;
