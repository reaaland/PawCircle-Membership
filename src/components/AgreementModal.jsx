import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw } from "@fortawesome/free-solid-svg-icons";

function AgreementModal({ onClose, paymentLink }) {
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);
  const [acceptedCode, setAcceptedCode] = useState(false);

  const allAccepted = acceptedTerms && acceptedPrivacy && acceptedCode;

  function handleContinue(e) {
    e.preventDefault();
    e.stopPropagation();

    if (!allAccepted || !paymentLink) return;

    window.location.assign(paymentLink);
  }

  return (
    <div className="modal__backdrop">
      <div className="agreement__modal">
        <button type="button" className="modal__close" onClick={onClose}>
          ×
        </button>

        <h3>
          <span className="purple">PawCircle</span> Membership Agreement{" "}
          <FontAwesomeIcon icon={faPaw} className="founder-paw" />
          <FontAwesomeIcon icon={faPaw} className="founder-paw" />
        </h3>

        <p className="agreement__intro">
          Please review and accept the following documents before continuing to
          checkout.
        </p>

        <div className="agreement__choices">
          <label className="agreement__choice">
            <input
              type="checkbox"
              checked={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
            />
            <span>
              I agree to the{" "}
              <Link to="/terms" target="_blank" rel="noopener noreferrer">
                Terms of Use
              </Link>
              .
            </span>
          </label>

          <label className="agreement__choice">
            <input
              type="checkbox"
              checked={acceptedPrivacy}
              onChange={(e) => setAcceptedPrivacy(e.target.checked)}
            />
            <span>
              I acknowledge the{" "}
              <Link to="/privacy" target="_blank" rel="noopener noreferrer">
                Privacy Policy
              </Link>
              .
            </span>
          </label>

          <label className="agreement__choice">
            <input
              type="checkbox"
              checked={acceptedCode}
              onChange={(e) => setAcceptedCode(e.target.checked)}
            />
            <span>
              I agree to follow the{" "}
              <Link to="/code" target="_blank" rel="noopener noreferrer">
                Code of Conduct
              </Link>
              .
            </span>
          </label>
        </div>

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