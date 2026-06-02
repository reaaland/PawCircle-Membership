import logo from "../assets/PC_Logo.png";

function Navbar() {
  return (
    <nav>
      <div className="nav__container">
        <div className="nav__logo">
          <img className="nav__logo--img" src={logo} alt="PawCircle Logo" />

          <div className="nav__logo--title">
            <span className="purple">PawCircle</span>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
