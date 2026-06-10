import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import AgreementModal from "./AgreementModal";

function Join() {
  const [showAgreement, setShowAgreement] = useState(false);
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  const requestedMembership = searchParams.get("membership") || "founder";

  const paymentOptions = {
    founder: {
      label: "Founder Membership",
      price: "$10/year",
      url: "https://buy.stripe.com/00w5kDetE9G43v90UCcAo01",
      active: true,
    },
    owner: {
      label: "Pet Owner Membership",
      price: "$1.50/month or $15/year",
      active: false,
    },
    provider: {
      label: "Pet Service Provider Membership",
      price: "$1.50/month or $15/year",
      active: false,
    },
    both: {
      label: "Owner + Provider Membership",
      price: "$2/month or $20/year",
      active: false,
    },
  };

  const membership = paymentOptions[requestedMembership]
    ? requestedMembership
    : "founder";

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
          <h2>Join PawCircle</h2>

          <p>
            Complete the form below to join PawCircle as a Founder Member and
            lock in Founder pricing while your membership remains active.
          </p>

          <form className="join-form" onSubmit={handleSubmit}>
            <div className="form__group">
              <label htmlFor="member__type">Membership Type</label>
              <select id="member__type" value={membership} required disabled>
                <option value="founder">Founder Membership - $10/year</option>
                <option value="owner">
                  Pet Owner Membership - $1.50/month or $15/year
                </option>
                <option value="provider">
                  Pet Service Provider Membership - $1.50/month or $15/year
                </option>
                <option value="both">
                  Owner + Provider Membership - $2/month or $20/year
                </option>
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
              <input type="text" id="username" placeholder="@username" />
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
              <input type="tel" id="phone" placeholder="(555) 555-5555" />
            </div>

            <div className="form__group">
              <label htmlFor="city">City</label>
              <input type="text" id="city" placeholder="Your city" />
            </div>

            <div className="form__group">
              <label htmlFor="state">State</label>
              <input type="text" id="state" placeholder="MN" />
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