import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw } from "@fortawesome/free-solid-svg-icons";

function AgreementModal({ onClose, paymentLink }) {
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [conductAccepted, setConductAccepted] = useState(false);

  const allAccepted =
    termsAccepted && privacyAccepted && conductAccepted;

  function handleContinue(e) {
  e.preventDefault();
  e.stopPropagation();

  if (!allAccepted || !paymentLink) return;

  window.location.assign(paymentLink);
}

  return (
    <div className="modal__backdrop">
      <div className="agreement__modal">
        <button
          type="button"
          className="modal__close"
          onClick={onClose}
        >
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

        <div className="agreement__choices">
          <label className="agreement__choice">
            <input
              type="checkbox"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
            />
            <span>
              I agree to the <Link to="/terms">Terms of Conduct</Link>.
            </span>
          </label>

          <label className="agreement__choice">
            <input
              type="checkbox"
              checked={privacyAccepted}
              onChange={(e) => setPrivacyAccepted(e.target.checked)}
            />
            <span>
              I acknowledge the <Link to="/privacy">Privacy Policy</Link>.
            </span>
          </label>

          <label className="agreement__choice">
            <input
              type="checkbox"
              checked={conductAccepted}
              onChange={(e) => setConductAccepted(e.target.checked)}
            />
            <span>
              I agree to follow the{" "}
              <Link to="/code-of-conduct">Code of Conduct</Link>.
            </span>
          </label>
        </div>

       <button
          type="button"
          className="btn"
          onClick={handleContinue}
          disabled={!allAccepted || !paymentLink}
        >
          {paymentLink
            ? "Agree & Continue to Checkout"
            : "Payment Coming Soon"}
        </button>
      </div>
    </div>
  );
}

export default AgreementModal;