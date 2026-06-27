import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LogInModal from "../components/LogInModal";

function MembershipSuccess() {
  const [showLogin, setShowLogin] = useState(false);
  const navigate = useNavigate();

function handleLogin(type) {
  setShowLogin(false);

  if (type === "register") {
    navigate("/profile");
  } else {
    navigate("/dashboard");
  }
}

  return (
    <section className="success-page">
      <div className="container">
        <div className="row row__column">
          <h1>Welcome to <span className="Purple">PawCircle</span>!</h1>

          <p>
            Create your PawCircle account or log in using the same email you used at
            checkout. If you already created an account, choose Log In instead of creating
            another account.
          </p>

          <button className="btn" onClick={() => setShowLogin(true)}>
            Create Account or Log In
          </button>

          {showLogin && (
            <LogInModal
              onClose={() => setShowLogin(false)}
              onLogin={handleLogin}
            />
          )}
        </div>
      </div>
    </section>
  );
}

export default MembershipSuccess;