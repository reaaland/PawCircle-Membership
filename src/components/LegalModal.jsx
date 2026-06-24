import TermsContent from "./legal/TermsContent";
import PrivacyContent from "./legal/PrivacyContent";
import CodeContent from "./legal/CodeContent";
import DisclaimerContent from "./legal/DisclaimerContent";

function LegalModal({ legalView, onClose }) {
  return (
    <div className="modal__backdrop">
      <div className="agreement__modal legal__modal">
        <button type="button" className="modal__close" onClick={onClose}>
          ×
        </button>

        <div className="legal__modal-content">
          {legalView === "terms" && <TermsContent />}
          {legalView === "privacy" && <PrivacyContent />}
          {legalView === "code" && <CodeContent />}
          {legalView === "disclaimer" && <DisclaimerContent />}
        </div>

        <button type="button" className="btn" onClick={onClose}>
          Return to Agreement
        </button>
      </div>
    </div>
  );
}

export default LegalModal;