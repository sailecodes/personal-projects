import "../../css/Footer.css";

const Footer = () => {
  return (
    <div className="Footer--container">
      <footer className="Footer">
        <p className="Footer--tagline">Want to connect?</p>
        <div className="Footer--social-container">
          <a
            href="https://www.linkedin.com/in/russel-koh-44bb90122/"
            target="_blank"
            rel="noreferrer">
            <img
              className="Footer--social-img"
              src="/img/socials/linkedin.png"
              alt="Linkedin logo"
            />
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
