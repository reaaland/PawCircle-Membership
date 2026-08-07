import { Link } from "react-router-dom";
import logo from "../assets/pawcircle-logo.webp";

function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer__content">
          <div>
            <img
              src={logo}
              alt="PawCircle Membership Logo"
              className="footer__logo"
            />

            <h4>
              <span className="purple">PawCircle Membership</span>
            </h4>

            <p>
              Helping pet owners and pet caregivers connect
              directly within their communities.
            </p>
            </div>

          <div className="footer__column">
            <h4>Explore</h4>
            <Link to="/">Home</Link>
            <Link to="/services">Services</Link>
            <Link to="/membership">Product Concept</Link>
            <Link to="/for-providers">For Pet Care Providers</Link>
            <Link to="/demo">Explore the Demo</Link>
          </div>

          <div className="footer__column">
            <h4>Company</h4>
            <Link to="/about">About</Link>
            <Link to="/case-study">Case Study</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/faq">FAQ</Link>
          </div>

          <div className="footer__column">
            <h4>Legal</h4>
            <Link to="/terms">Terms of Use</Link>
           <Link to="/privacy">Privacy Policy</Link>
           <Link to="/code">Code of Conduct </Link>
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
