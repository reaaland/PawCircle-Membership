import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw } from "@fortawesome/free-solid-svg-icons";

function Join() {
  const [showAgreement, setShowAgreement] = useState(false);

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

          <form className="join-form" onSubmit={handleSubmit}>
           <div className="form__group">
          <label htmlFor="member__type">Membership Type</label>
          <select id="member__type" required>
            <option value="">Select membership type</option>
            <option value="founder">Founder Membership</option>
            <option value="pioneer">Pioneer Membership</option>
          </select>
        </div>

        <div className="form__group">
          <label htmlFor="name">Full Name</label>
          <input type="text" id="name" placeholder="Enter your name" required />
        </div>

        <div className="form__group">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" placeholder="@username" />
        </div>

        <div className="form__group">
          <label htmlFor="email">Email Address</label>
          <input type="email" id="email" placeholder="you@email.com" required />
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

            <button className="btn" type="submit">
              Continue to Secure Checkout
            </button>
          </form>

          {showAgreement && (
            <div className="modal__backdrop">
              <div className="agreement__modal">
                <button
                  className="modal__close"
                  onClick={() => setShowAgreement(false)}
                >
                  ×
                </button>

              <h3>
              <span className="purple">PawCircle</span> Membership Agreement{" "}
              <FontAwesomeIcon icon={faPaw} className="founder-paw" />
              <FontAwesomeIcon icon={faPaw} className="founder-paw" />
              </h3>
                <p className="agreement__intro">
                  Please review and accept the following documents before continuing to secure checkout.
                </p>

                <label>
                  <input type="checkbox" required />
                  I agree to the Terms of Use.
                </label>

                <label>
                  <input type="checkbox" required />
                  I acknowledge the Privacy Policy.
                </label>

                <label>
                  <input type="checkbox" required />
                  I agree to follow the Code of Conduct.
                </label>

                <button className="btn">
                  Agree & Continue to Checkout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Join;