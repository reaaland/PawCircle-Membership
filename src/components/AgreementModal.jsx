import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw } from "@fortawesome/free-solid-svg-icons";

function AgreementModal({ onClose }) {
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [conductAccepted, setConductAccepted] = useState(false);

  const allAccepted = termsAccepted && privacyAccepted && conductAccepted;

  function handleContinue() {
    if (!allAccepted) return;

    // Later this will become Stripe checkout
    onClose();
  }

  return (
    <div className="modal__backdrop">
      <div className="agreement__modal">
        <button className="modal__close" onClick={onClose}>
          ×
        </button>

        <h3>
          <span className="purple">PawCircle</span> Membership Agreement{" "}
          <FontAwesomeIcon icon={faPaw} className="founder-paw" />
          <FontAwesomeIcon icon={faPaw} className="founder-paw" />
        </h3>

        <p className="agreement__intro">
          Please review and accept the following documents before continuing to
          secure checkout.
        </p>

        <label>
          <input
            type="checkbox"
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
          />
          I agree to the <Link to="/terms">Terms of Conduct</Link>.
        </label>

        <label>
          <input
            type="checkbox"
            checked={privacyAccepted}
            onChange={(e) => setPrivacyAccepted(e.target.checked)}
          />
          I acknowledge the <Link to="/privacy">Privacy Policy</Link>.
        </label>

        <label>
          <input
            type="checkbox"
            checked={conductAccepted}
            onChange={(e) => setConductAccepted(e.target.checked)}
          />
          I agree to follow the{" "}
          <Link to="/code-of-conduct">Code of Conduct</Link>.
        </label>

        <button
          className="btn"
          disabled={!allAccepted}
          onClick={handleContinue}
        >
          Agree & Continue to Checkout
        </button>
      </div>
    </div>
  );
}

export default AgreementModal;