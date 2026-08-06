import { useState } from "react";
import { signIn, signUp, resetPassword } from "../Services/authService";

function LogInModal({ onClose, onLogin }) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");


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

    if (isRegistering) {
      onLogin("register");
    } else {
      onLogin("login");
    }

    onClose();
    }

    async function handleResetPassword() {
  setError("");

  const cleanEmail = email.toLowerCase().trim();

  if (!cleanEmail) {
    setError("Please enter your email address first.");
    return;
  }

  setIsLoading(true);

  const { error } = await resetPassword(cleanEmail);

  if (error) {
    setError(error.message);
    setIsLoading(false);
    return;
  }

  setMessage("Password reset email sent. Please check your inbox.");
  setIsLoading(false);
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
            ? "Create your PawCircle Membership login using the same email you used at checkout."
            : "Log in to access your PawCircle Membership account."}
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

          {message && <p className="form__success">{message}</p>}
          {error && <p className="form__error">{error}</p>}

          <button className="btn" type="submit" disabled={isLoading}>
            {isLoading
              ? "🐾 Please wait..."
              : isRegistering
              ? "Create Account"
              : "Login"}
          </button>
        </form>

        {!isRegistering && (
          <button
            type="button"
            className="modal__switch"
            onClick={handleResetPassword}
            disabled={isLoading}
          >
            Forgot password?
          </button>
        )}

        <button
          type="button"
          className="modal__switch"
          onClick={() => {
            setError("");
            setMessage("");
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