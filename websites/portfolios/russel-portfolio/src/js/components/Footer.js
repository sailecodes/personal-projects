import "../../css/Footer.css";

const Footer = () => {
  return (
    <div className="Footer--container">
      <footer
        className="Footer"
        id="Footer">
        <p className="Footer--tagline">Want to connect?</p>
        <div className="Footer--contact-container">
          <a
            href="https://www.linkedin.com/in/russel-koh-44bb90122/"
            target="_blank"
            rel="noreferrer">
            <img
              className="Footer--contact-img"
              src="./img/socials/linkedin.png"
              alt="Linkedin logo"
            />
          </a>
          <div>
            <p>Email: kohrussel@outlook.com</p>
            <p>Number: (714)-244-5064</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
