function AgreementModal({ onClose }) {
  return (
    <div className="modal__backdrop">
      <div className="agreement__modal">
        <button className="modal__close" onClick={onClose}>
          ×
        </button>

        <h3>Membership Agreement</h3>

        <label className="agreement__item">
          <span>I have read and agree to the Terms of Conduct.</span>
          <input type="checkbox" required />
        </label>

        <label className="agreement__item">
          <span>I have read and agree to the Privacy Policy.</span>
          <input type="checkbox" required />
        </label>

        <label className="agreement__item">
          <span>I have read and agree to the Code of Conduct.</span>
          <input type="checkbox" required />
        </label>

        <button className="btn">Continue</button>
      </div>
    </div>
  );
}

export default AgreementModal;