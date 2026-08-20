import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/pawcircle-logo-ui.webp";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="nav__container">
      <Link to="/" className="nav__logo">
        <img
          className="nav__logo--img"
          src={logo}
          alt="PawCircle Membership Logo"
        />

        <div className="nav__logo--title">
          <span className="purple">PawCircle Membership</span>
        </div>
      </Link>

      <div className="nav__links">
        <Link to="/" className="nav__link">
          Home
        </Link>
        <Link to="/membership" className="nav__link">
          Product
        </Link>
        <Link to="/demo" className="nav__link nav__link--primary">
          Explore Demo
        </Link>
        <Link to="/case-study" className="nav__link">
          Case Study
        </Link>
        <Link to="/about" className="nav__link">
          About
        </Link>
        <Link to="/contact" className="nav__link">
          Contact
        </Link>
      </div>

      <button
        className="btn__menu"
        aria-label="Open navigation menu"
        onClick={() => setMenuOpen(true)}
      >
        <i className="fa-solid fa-bars"></i>
      </button>

      {menuOpen && (
        <div className="menu__backdrop">
          <button
            className="btn__menu btn__menu--close"
            aria-label="Close navigation menu"
            onClick={() => setMenuOpen(false)}
          >
            ×
          </button>

          <Link to="/" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          <Link to="/membership" onClick={() => setMenuOpen(false)}>
            Product
          </Link>
          <Link to="/demo" onClick={() => setMenuOpen(false)}>
            Explore Demo
          </Link>
          <Link to="/case-study" onClick={() => setMenuOpen(false)}>
            Case Study
          </Link>
          <Link to="/about" onClick={() => setMenuOpen(false)}>
            About
          </Link>
          <Link to="/contact" onClick={() => setMenuOpen(false)}>
            Contact
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
