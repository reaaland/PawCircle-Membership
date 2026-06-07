import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import AgreementModal from "./AgreementModal";

function Join() {
  const [showAgreement, setShowAgreement] = useState(false);
  const [searchParams] = useSearchParams();

  const membership = searchParams.get("membership");

  const paymentLinks = {
    founder: {
      url: "https://buy.stripe.com/YOUR_FOUNDER_PAYMENT_LINK",
      active: true,
    },
    pioneer: {
      url: "https://buy.stripe.com/YOUR_PIONEER_PAYMENT_LINK",
      active: false,
    },
    standard: {
      url: "",
      active: false,
    },
  };

  const selectedMembership = paymentLinks[membership];

  const selectedPaymentLink =
    selectedMembership?.active ? selectedMembership.url : "";

  function handleSubmit(e) {
    e.preventDefault();
    setShowAgreement(true);
  }

  return (
    <section id="join">
      <div className="container">
        <div className="row row__column">
          <h2>Join PawCircle</h2>

          <p>Start connecting pet owners and caregivers directly.</p>

          {membership && (
            <p className="join__selected">
              Selected membership: {membership}
            </p>
          )}

          <form className="join-form" onSubmit={handleSubmit}>
            <div className="form__group">
              <label htmlFor="member__type">Membership Type</label>
              <select id="member__type" required>
                <option value="">Select membership type</option>
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

            <button className="btn" type="submit">
              Continue
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