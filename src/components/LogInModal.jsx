function LogInModal({ onClose }) {
  return (
    <div className="modal__backdrop">
      <div className="login__modal">
        <button className="modal__close" onClick={onClose}>
          ×
        </button>

        <h2>Member Login</h2>
        <p>Login access will be available soon for PawCircle members.</p>

        <input type="email" placeholder="Email address" />
        <input type="password" placeholder="Password" />

        <button className="btn">Login</button>
      </div>
    </div>
  );
}

export default LogInModal;