import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import AgreementModal from "./AgreementModal";
import {
  getSiteSettings,
  membershipInfo,
  stripePricingTables,
} from "../Config/membershipConfig";

function Join() {
  const [showAgreement, setShowAgreement] = useState(false);
  const [agreementAccepted, setAgreementAccepted] = useState(false);
  const [searchParams] = useSearchParams();
  const accessMessage = searchParams.get("message");
  const [isLoading, setIsLoading] = useState(false);
  const [founderActive, setFounderActive] = useState(true);
  const [loadingSettings, setLoadingSettings] = useState(true);

  useEffect(() => {
    async function loadSiteSettings() {
      const settings = await getSiteSettings();

      setFounderActive(settings.founder_count < settings.founder_limit);
      setLoadingSettings(false);
    }

    loadSiteSettings();
  }, []);

 if (loadingSettings) {
  return (
    <section id="join">
      <div className="container">
        <div className="row row__column">
          <div className="join-loading">
            <div className="paw-loader">🐾</div>
            <p>Loading membership options...</p>
          </div>
        </div>
      </div>
    </section>
  );
}

  const defaultMembership = founderActive ? "founder" : "both";

  const requestedMembership =
    searchParams.get("membership") || defaultMembership;

  const paymentOptions = {
    founder: {
      label: membershipInfo.founder.name,
      price: membershipInfo.founder.price,
      url: "https://buy.stripe.com/8x26oHgBM3hG4zd8n4cAo03",
      active: founderActive,
    },
    owner: {
      label: membershipInfo.owner.name,
      price: membershipInfo.owner.price,
      active: !founderActive,
    },
    provider: {
      label: membershipInfo.provider.name,
      price: membershipInfo.provider.price,
      active: !founderActive,
    },
    both: {
      label: membershipInfo.both.name,
      price: membershipInfo.both.price,
      active: !founderActive,
    },
  };

  const membership = paymentOptions[requestedMembership]
  ? requestedMembership
  : defaultMembership;

  const selectedMembership = paymentOptions[membership];

  const selectedPaymentLink =
    selectedMembership?.active && selectedMembership?.url
      ? selectedMembership.url
      : "";

  function handleContinue() {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setShowAgreement(true);
    }, 800);
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleContinue();
  }

  return (
    <section id="join">
      <div className="container">
        <div className="row row__column">
          <h2>Join <span className="purple">PawCircle</span></h2>
            <p>
              {founderActive ? (
              <>
                Complete the form below to join{" "}
                <span className="purple">PawCircle</span> as a Founder Member and lock in
                Founder pricing while your membership remains active.
              </>
            ) : (
              <>
               Complete the form below to join{" "}
              <span className="purple">PawCircle</span> and choose the membership that best
              fits your role as a pet owner, pet service provider, or both.
              </>
            )}
          </p>

          {accessMessage === "membership-required" && (
            <div className="join__notice">
              🔒 An active PawCircle membership is required to access that page. Please join or renew your membership to continue.
            </div>
          )}

          <form className="join-form" onSubmit={handleSubmit}>
            <div className="form__group">
              <label htmlFor="member__type">Membership Type</label>

              <select id="member__type" value={membership} required disabled>
               {founderActive && (
              <option value="founder">
                {membershipInfo.founder.name} - {membershipInfo.founder.price}
               </option>
            )}

                <option value="owner">
                  {membershipInfo.owner.name} - {membershipInfo.owner.price}
                </option>

                <option value="provider">
                  {membershipInfo.provider.name} - {membershipInfo.provider.price}
                </option>

                <option value="both">
                  {membershipInfo.both.name} - {membershipInfo.both.price}
                </option>
              </select>
            </div>

            <div className="form__group">
              <label>Public Display Name</label>
              <input
                type="text"
                name="display_name"
                placeholder="Jane Smith or Happy Paws Pet Care"
                required
              />
            </div>

            <div className="form__group">
              <label>Username</label>
              <input
                type="text"
                name="username"
                placeholder="Choose a unique username"
                required
              />
            </div>
            <div className="form__group">
              <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="you@example.com"
                  required
                />
              </div>

            <div className="form__group">
              <label htmlFor="phone">Phone Number</label>
              <input type="tel" id="phone" placeholder="(555) 555-5555" 
              required 
              />
            </div>

            <div className="form__group">
              <label htmlFor="city">City</label>
              <input type="text" id="city" placeholder="Your city" 
              required/>
            </div>

            <div className="form__group">
              <label htmlFor="state">State</label>
              <input type="text" id="state" placeholder="MN"
              required
              />
            </div>

            <button className="btn" type="submit" disabled={isLoading}>
              {isLoading ? "🐾 Opening Membership Agreement..." : "Continue"}
            </button>
          </form>

          {showAgreement && (
            <AgreementModal
              onClose={() => setShowAgreement(false)}
              paymentLink={selectedPaymentLink}
              onContinue={() => {
                setShowAgreement(false);
                setAgreementAccepted(true);
              }}
            />
          )}

          {agreementAccepted && !founderActive && stripePricingTables[membership] && (
            <div className="pricing-table-wrapper">
              <stripe-pricing-table
                pricing-table-id={stripePricingTables[membership]}
                publishable-key="pk_live_51TdNdDGgktsetxqRKjbBT3rlw7X1hAIX5Evyyq9XKNiHFdmsQVe3ATbzwmKGXJ1AsiyUB4fVqqYV5thX6bzR7YKI0058zBCgCU"
              >
              </stripe-pricing-table>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Join;