import { useState } from "react";
import LegalModal from "./LegalModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw } from "@fortawesome/free-solid-svg-icons";

function AgreementModal({ onClose, paymentLink }) {
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);
  const [acceptedCode, setAcceptedCode] = useState(false);
  const [acceptedDisclaimer, setAcceptedDisclaimer] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [legalView, setLegalView] = useState(null);

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
  if (legalView) {
  return (
    <LegalModal
      legalView={legalView}
      onClose={() => setLegalView(null)}
    />
  );
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
      <button
        type="button"
        className="legal__link"
        onClick={() => setLegalView("terms")}
      >
        Terms of Use
      </button>
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
      <button
        type="button"
        className="legal__link"
        onClick={() => setLegalView("privacy")}
      >
        Privacy Policy
      </button>
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
      <button
        type="button"
        className="legal__link"
        onClick={() => setLegalView("code")}
      >
        Code of Conduct
      </button>
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
      I understand the{" "}
      <button
        type="button"
        className="legal__link"
        onClick={() => setLegalView("disclaimer")}
      >
        PawCircle Disclaimer
      </button>
      .
    </span>
  </label>
</div>

      <button
        type="button"
        className="agreement__submit"
        disabled={!allAccepted || !paymentLink || isLoading}
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