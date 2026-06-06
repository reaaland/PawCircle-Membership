import logo from "../assets/PC_Logo.png";

function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer__content">
          <div>
            <img src={logo} alt="PawCircle Logo" className="footer__logo" />
            <p>
              <span className="purple">PawCircle</span> helps pet owners and
              pet caregivers connect directly in their community.
            </p>
          </div>

          <div className="footer__column">
            <h4>Explore</h4>
            <a href="/">Home</a>
            <a href="/services">Services</a>
            <a href="/membership">Membership</a>
            <a href="/join">Join PawCircle</a>
          </div>

          <div className="footer__column">
            <h4>Company</h4>
            <a href="/about">About</a>
            <a href="/contact">Contact</a>
            <a href="/faq">FAQ</a>
          </div>

          <div className="footer__column">
            <h4>Legal</h4>
            <a href="/terms">Terms of Conduct</a>
            <a href="/privacy">Privacy Policy</a>
          </div>
        </div>

        <p className="footer__copyright">
          © 2026 PawCircle LLC. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;