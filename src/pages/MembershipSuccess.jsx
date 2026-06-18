import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LogInModal from "../components/LogInModal";

function MembershipSuccess() {
  const [showLogin, setShowLogin] = useState(false);
  const navigate = useNavigate();

  function handleLogin() {
    setShowLogin(false);
    navigate("/dashboard");
  }

  return (
    <section className="success-page">
      <div className="container">
        <div className="row row__column">
          <h1>Welcome to PawCircle!</h1>

          <p>Your membership payment has been received.</p>

          <p>
            Log in to access your dashboard and complete your member profile.
          </p>

          <button className="btn" onClick={() => setShowLogin(true)}>
            Log In
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