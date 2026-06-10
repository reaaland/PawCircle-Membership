import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import AgreementModal from "./AgreementModal";

function Join() {
  const [showAgreement, setShowAgreement] = useState(false);
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

function handleContinue() {
  setIsLoading(true);

  setTimeout(() => {
    setIsLoading(false);
    setShowAgreement(true);
  }, 800);
}

  const membership = searchParams.get("membership") || "founder";

  const paymentOptions = {
    founder: {
      type: "link",
      url: "https://buy.stripe.com/00w5kDetE9G43v90UCcAo01",
      active: true,
    },
  
    // Future Standard Membership Pricing Tables
    // Pet Owner
    // Provider
    // Pet Owner + Provider
    // Stripe Pricing Tables already created
    // Activate after Pioneer closes (1500 members)
    standard: {
      type: "pricingTable",
      active: false,
    },
  };

  const selectedMembership = paymentOptions[membership];

  const selectedPaymentLink =
    selectedMembership?.type === "link" && selectedMembership?.active
      ? selectedMembership.url
    : "";

  function handleSubmit(e) {
  e.preventDefault();
  handleContinue();
}

  return (
    <section id="join">
      <div className="container">
        <div className="row row__column">
          <h2>Join PawCircle</h2>

          <p>Start connecting pet owners and caregivers directly.</p>


          <form className="join-form" onSubmit={handleSubmit}>
            <div className="form__group">
              <label htmlFor="member__type">Membership Type</label>
            <select id="member__type" value={membership} required disabled>
            <option value="founder">Founder Membership</option>
            <option value="pioneer">Pioneer Membership</option>
            <option value="standard">Standard Membership</option>
          </select>
            </div>

            <div className="form__group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                placeholder="Enter your name"
                required
              />
            </div>

            <div className="form__group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                placeholder="@username"
              />
            </div>

            <div className="form__group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                placeholder="you@email.com"
                required
              />
            </div>

            <div className="form__group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                placeholder="(555) 555-5555"
              />
            </div>

            <div className="form__group">
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                placeholder="Your city"
              />
            </div>

            <div className="form__group">
              <label htmlFor="state">State</label>
              <input
                type="text"
                id="state"
                placeholder="MN"
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
            />
          )}
        </div>
      </div>
    </section>
  );
}

export default Join;