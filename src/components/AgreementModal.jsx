import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw } from "@fortawesome/free-solid-svg-icons";

function AgreementModal({ onClose, paymentLink }) {
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);
  const [acceptedCode, setAcceptedCode] = useState(false);
  const [acceptedDisclaimer, setAcceptedDisclaimer] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const allAccepted =
  acceptedTerms && acceptedPrivacy && acceptedCode && acceptedDisclaimer;

  function handleContinue(e) {
  e.preventDefault();
  e.stopPropagation();

  if (!allAccepted || !paymentLink) return;

  setIsLoading(true);

  setTimeout(() => {
    window.location.assign(paymentLink);
  }, 800);
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
          <label className="agreement__choice">
          <input
            type="checkbox"
            checked={acceptedDisclaimer}
            onChange={(e) => setAcceptedDisclaimer(e.target.checked)}
          />
          <span>
            <span>
              I understand that PawCircle is a membership platform designed to help
              members connect with one another. PawCircle does not provide pet care
              services, verify members, or guarantee services.
            </span>
          </span>
        </label>
        </div>

        <button
      className="btn"
      disabled={!allAccepted || isLoading}
      onClick={handleContinue}
    >
      {isLoading
        ? "🐾 Redirecting to Checkout..."
        : "Agree & Continue to Checkout"}
    </button>
      </div>
    </div>
  );
}

export default AgreementModal;