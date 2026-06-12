import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LogInModal({ onClose, onLogin }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  function handleLogin(e) {
    e.preventDefault();

    setIsLoading(true);

    setTimeout(() => {
      onLogin();
      onClose();
      navigate("/dashboard");
    }, 800);
  }

  return (
    <div className="modal__backdrop">
      <div className="login__modal">
        <button
          className="modal__close"
          onClick={onClose}
          disabled={isLoading}
        >
          ×
        </button>

        <h2>Member Login</h2>

        <p>
          Log in to access your{" "}
          <span className="purple">PawCircle</span> member account.
        </p>

        <form onSubmit={handleLogin}>
          <input type="email" placeholder="Email address" required />
          <input type="password" placeholder="Password" required />

          <button
            className="btn"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "🐾 Logging In..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default LogInModal;