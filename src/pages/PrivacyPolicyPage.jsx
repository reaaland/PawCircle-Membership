import PrivacyContent from "../components/legal/PrivacyContent";

function PrivacyPolicyPage() {
  return (
    <section className="legal-page">
      <div className="container">
        <div className="row row__narrow">
          <PrivacyContent />
        </div>
      </div>
    </section>
  );
}

export default PrivacyPolicyPage;