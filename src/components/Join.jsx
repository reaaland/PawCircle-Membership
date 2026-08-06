import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import AgreementModal from "./AgreementModal";
import {
  getSiteSettings,
  membershipInfo,
  stripePricingTables,
} from "../Config/membershipConfig";
import {
  ROLE_OPTIONS,
  buildClientReference,
  buildCheckoutUrl,
  getProfileType,
  getSignupSource,
  getValidRole,
} from "../utils/signupTracking";

function Join() {
  const [showAgreement, setShowAgreement] = useState(false);
  const [agreementAccepted, setAgreementAccepted] = useState(false);
  const [searchParams] = useSearchParams();
  const accessMessage = searchParams.get("message");
  const requestedRole =
    getValidRole(searchParams.get("role")) ||
    getValidRole(searchParams.get("membership"));
  const [role, setRole] = useState(requestedRole);
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

  const paymentOptions = useMemo(
    () => ({
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
    }),
    [founderActive],
  );

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

  const membership = founderActive ? "founder" : role || "owner";
  const selectedMembership = paymentOptions[membership];
  const signupSource = getSignupSource(searchParams);
  const clientReference = buildClientReference(
    getProfileType(role),
    signupSource,
  );
  const selectedPaymentLink = buildCheckoutUrl(selectedMembership?.url, {
    profileType: getProfileType(role),
    source: signupSource,
    searchParams,
  });

  function handleSubmit(event) {
    event.preventDefault();

    if (!role) return;

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setShowAgreement(true);
    }, 800);
  }

  return (
    <section id="join">
      <div className="container">
        <div className="row row__column">
          <h2>
            Join <span className="purple">PawCircle Membership</span>
          </h2>
          <p>
            {founderActive ? (
              <>
                Founder is your membership price. Your role tells PawCircle
                whether you are looking for pet care, offering it, or both.
              </>
            ) : (
              <>
                Choose how you will use PawCircle Membership. Your selection
                sets up the right profile and membership option.
              </>
            )}
          </p>

          {accessMessage === "membership-required" && (
            <div className="join__notice">
              🔒 An active PawCircle Membership is required to access that page.
              Please join or renew your membership to continue.
            </div>
          )}

          {founderActive && (
            <div className="join-founder-card" aria-label="Founder Membership price">
              <span className="join-founder-card__badge">First 500 Members</span>
              <div>
                <h3>🐾 Founder Membership</h3>
                <p>
                  Lock in Founder pricing while your membership remains active.
                  Your role selection does not change this price.
                </p>
              </div>
              <strong>$10/year</strong>
            </div>
          )}

          <form className="join-form" onSubmit={handleSubmit}>
            <fieldset className="join-role-fieldset">
              <legend>How will you use PawCircle?</legend>
              <p className="join-role-help">Choose one. You can update this later in your profile.</p>

              <div className="join-role-options">
                {ROLE_OPTIONS.map((option) => (
                  <label
                    className={`join-role-option${
                      role === option.value ? " join-role-option--selected" : ""
                    }`}
                    key={option.value}
                  >
                    <input
                      type="radio"
                      name="role"
                      value={option.value}
                      checked={role === option.value}
                      onChange={(event) => setRole(event.target.value)}
                      required
                    />
                    <span>
                      <strong>{option.label}</strong>
                      <small>{option.description}</small>
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="form__group">
              <label htmlFor="membership_type">Membership Price</label>
              <input
                id="membership_type"
                value={`${selectedMembership.label} — ${selectedMembership.price}`}
                readOnly
              />
            </div>

            <div className="form__group">
              <label htmlFor="display_name">Public Display Name</label>
              <input
                type="text"
                id="display_name"
                name="display_name"
                placeholder="Jane Smith or Happy Paws Pet Care"
                required
              />
            </div>

            <div className="form__group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
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
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="(555) 555-5555"
                required
              />
            </div>

            <div className="form__group">
              <label htmlFor="city">City</label>
              <input type="text" id="city" name="city" placeholder="Your city" required />
            </div>

            <div className="form__group">
              <label htmlFor="state">State</label>
              <input type="text" id="state" name="state" placeholder="MN" required />
            </div>

            <button className="btn" type="submit" disabled={isLoading || !role}>
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

          {agreementAccepted &&
            !founderActive &&
            stripePricingTables[membership] && (
              <div className="pricing-table-wrapper">
                <stripe-pricing-table
                  pricing-table-id={stripePricingTables[membership]}
                  publishable-key="pk_live_51TdNdDGgktsetxqRKjbBT3rlw7X1hAIX5Evyyq9XKNiHFdmsQVe3ATbzwmKGXJ1AsiyUB4fVqqYV5thX6bzR7YKI0058zBCgCU"
                  client-reference-id={clientReference}
                />
              </div>
            )}
        </div>
      </div>
    </section>
  );
}

export default Join;
