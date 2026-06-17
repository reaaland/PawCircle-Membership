import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signIn } from "../Services/authService";

function LogInModal({ onClose, onLogin }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin(e) {
    e.preventDefault();

    setIsLoading(true);
    setError("");

    const { error } = await signIn(email, password);

    if (error) {
      setError(error.message);
      setIsLoading(false);
      return;
    }

    onLogin();
    onClose();
    navigate("/dashboard");
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
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && (
            <p className="form__error">
              {error}
            </p>
          )}

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