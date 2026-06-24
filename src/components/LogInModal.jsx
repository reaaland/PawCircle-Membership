import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signIn, signUp } from "../Services/authService";

function LogInModal({ onClose, onLogin }) {
  const navigate = useNavigate();
  const [isRegistering, setIsRegistering] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    setIsLoading(true);
    setError("");

    const cleanEmail = email.toLowerCase().trim();

    const { error } = isRegistering
      ? await signUp(cleanEmail, password)
      : await signIn(cleanEmail, password);

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

        <h2>{isRegistering ? "Create Account" : "Member Login"}</h2>

        <p>
          {isRegistering
            ? "Create your PawCircle login using the same email you used at checkout."
            : "Log in to access your PawCircle member account."}
        </p>

        <form onSubmit={handleSubmit}>
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

          {error && <p className="form__error">{error}</p>}

          <button className="btn" type="submit" disabled={isLoading}>
            {isLoading
              ? "🐾 Please wait..."
              : isRegistering
              ? "Create Account"
              : "Login"}
          </button>
        </form>

        <button
          type="button"
          className="modal__switch"
          onClick={() => {
            setError("");
            setIsRegistering(!isRegistering);
          }}
          disabled={isLoading}
        >
          {isRegistering
            ? "Already have an account? Log in"
            : "New member? Create your account"}
        </button>
      </div>
    </div>
  );
}

export default LogInModal;