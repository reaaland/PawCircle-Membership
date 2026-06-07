import { useNavigate } from "react-router-dom";

function LogInModal({ onClose }) {
  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();

    onClose();
    navigate("/");
  }

  return (
    <div className="modal__backdrop">
      <div className="login__modal">
        <button className="modal__close" onClick={onClose}>
          ×
        </button>

        <h2>Member Login</h2>
        <p>Log in to access your PawCircle member account.</p>

        <form onSubmit={handleLogin}>
          <input type="email" placeholder="Email address" required />
          <input type="password" placeholder="Password" required />

          <button className="btn" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default LogInModal;