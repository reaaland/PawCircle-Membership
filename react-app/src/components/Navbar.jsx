import logo from "../assets/PC_Logo.png";

function Navbar() {
  return (
    
    <div className="nav__container">

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
        <button className="btn__menu">
        <i className="fa-solid fa-bars"></i>
        </button>
    </div>
  );
}

export default Navbar;
