import { useState } from "react";
import logo from "../assets/PC_Logo.png";

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
        <a href="#home" className="nav__link">Home</a>
        <a href="#about" className="nav__link">About</a>
        <a href="#membership" className="nav__link">Membership</a>
        <a href="#services" className="nav__link">Services</a>
        <a href="#login" className="nav__link">Login</a>
        <a href="#join" className="nav__link nav__link--primary">Join PawCircle</a>
      </div>

      <button className="btn__menu" onClick={() => setMenuOpen(true)}>
        <i className="fa-solid fa-bars"></i>
      </button>

      {menuOpen && (
        <div className="menu__backdrop">
          <button className="btn__menu btn__menu--close" onClick={() => setMenuOpen(false)}
            >
              
            ×
          </button>

          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
          <a href="#services" onClick={() => setMenuOpen(false)}>Services</a>
          <a href="#membership" onClick={() => setMenuOpen(false)}>Membership</a>
          <a href="#join" onClick={() => setMenuOpen(false)}>Join</a>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
