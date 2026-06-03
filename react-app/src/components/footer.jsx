import logo from "../assets/PC_Logo.png";

function Footer() {
    return (
        <footer>
  <div className="container">
    <div className="row">
    <div className="row footer__row">

      <div className="footer__container">
        <a href="#home">
        <img
        src={logo}
        className="footer__logo--img"
        alt="PawCircle Logo"
        />
        </a>
      </div>

      <div className="footer__list--column">
        <h4>Explore</h4>
        <a href="#home" className="footer__link">Home</a>
        <a href="#membership" className="footer__link">Membership</a>
        <a href="#services" className="footer__link">Services</a>
        <a href="#join" className="footer__link footer__link--primary">Join PawCircle</a>
      </div>

      <div className="footer__list--column">
        <h4>Company</h4>
        <a href="#about" className="footer__link">About</a>
        <a href="#contact" className="footer__link">Contact</a>
        <a href="#faq" className="footer__link">FAQ</a>
      </div>

      <div className="footer__list--column">
        <h4>Legal</h4>
        <a href="#" className="footer__link">Terms</a>
        <a href="#" className="footer__link">Privacy</a>
      </div>
      <p className="footer__disclaimer">
        PawCircle connects pet owners and pet caregivers. Members are responsible for screening, agreements, payments, and pet care decisions.
      </p>
    </div>

    <div className="footer__copyright">
      Copyright &copy; 2026 PawCircle LLC
    </div>
  </div>
  </div>
</footer>
    )
}

export default Footer;
 