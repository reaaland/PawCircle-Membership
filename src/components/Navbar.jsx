import { useState } from "react";
import logo from "../assets/PC_Logo.png";
import { Link } from "react-router-dom";
import LoginModal from "./LoginModal";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (

    <nav className="nav__container">
      <div className="nav__logo">
        <img className="nav__logo--img" src={logo} alt="PawCircle Logo" />

        <div className="nav__logo--title">
          <span className="purple">PawCircle</span>
        </div>
      </div>

      <div className="nav__links">
        <Link to="/" className="nav__link">Home</Link>
        <Link to="/about" className="nav__link">About</Link>
        <Link to="/membership" className="nav__link">Membership</Link>
        <Link to="/services" className="nav__link">Services</Link>
        <button className="nav__link">
          Login
        </button>
        <Link to="/join" className="nav__link nav__link--primary">
          Join PawCircle
        </Link>
      </div>

      <button className="btn__menu" onClick={() => setMenuOpen(true)}>
        <i className="fa-solid fa-bars"></i>
      </button>

      {menuOpen && (
        <div className="menu__backdrop">
          <button
            className="btn__menu btn__menu--close"
            onClick={() => setMenuOpen(false)}
          >
            ×
          </button>

          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>
          <Link to="/membership" onClick={() => setMenuOpen(false)}> Membership</Link>
          <Link to="/services" onClick={() => setMenuOpen(false)}>Services</Link>
          <Link to="/join" onClick={() => setMenuOpen(false)}>
            Join
          </Link>
        </div>
      )}
       <LoginModal />
    </nav>
  );
}

export default Navbar;
