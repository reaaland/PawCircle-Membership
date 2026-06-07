function LogInModal({ onClose }) {
  return (
    <div className="modal__backdrop">
      <div className="modal">
        <button
          className="modal__close"
          onClick={onClose}
        >
          ×
        </button>

        <h2>Login</h2>
        <p>Member login coming soon.</p>
      </div>
    </div>
  );
}

export default LogInModal;