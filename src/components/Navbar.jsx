import { useState } from "react";
import logo from "../assets/PC_Logo.png";
import { Link } from "react-router-dom";
import LogInModal from "./LogInModal";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
        <Link to="/services" 
        className="nav__link">Services</Link>
        <Link to="/providers" className="nav__link">Providers</Link>
     {isLoggedIn ? (
  <>
    <Link to="/dashboard" className="nav__link">Dashboard</Link>
        <span
      className="nav__link"
      onClick={() => setIsLoggedIn(false)}
    >
      Logout
    </span>
  </>
) : (
  <>
    <span
      className="nav__link"
      onClick={() => setShowLogin(true)}
    >
      Login
    </span>

    <Link to="/join" className="nav__link nav__link--primary">
      Join PawCircle
    </Link>
  </>
)}
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
          <Link to="/membership" onClick={() => setMenuOpen(false)}>Membership</Link>
          <Link to="/services" onClick={() => setMenuOpen(false)}>Services</Link>
      {isLoggedIn ? (
  <>
    <Link to="/dashboard" onClick={() => setMenuOpen(false)}>
      Dashboard
    </Link>

    <Link to="/providers" onClick={() => setMenuOpen(false)}>
      Providers
    </Link>

    <span
      onClick={() => {
        setMenuOpen(false);
        setIsLoggedIn(false);
      }}
    >
      Logout
    </span>
  </>
) : (
  <>
    <span
      onClick={() => {
        setMenuOpen(false);
        setShowLogin(true);
      }}
    >
      Login
    </span>

    <Link to="/join" onClick={() => setMenuOpen(false)}>
      Join
    </Link>
  </>
)}
         
        </div>
      )}
       {showLogin && (
  <LogInModal
    onClose={() => setShowLogin(false)}
    onLogin={() => setIsLoggedIn(true)}
  />
)}
    </nav>
  );
}

export default Navbar;
