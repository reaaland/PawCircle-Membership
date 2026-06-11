import { Link } from "react-router-dom";

function MembershipDetails() {
  return (
    <section id="membership-details">
      <div className="container">
        <div className="row row__column">
          <div className="page__header">
            <h2>Membership Details</h2>

            <Link to="/dashboard" className="page__close">
              ✕
            </Link>
          </div>

          <div className="membership-details__card">
            <h3>Founder Membership</h3>

            <p>
              Founder Members lock in Founder pricing while their membership
              remains active.
            </p>

            <ul>
              <li>$10 annual membership</li>
              <li>First 500 members</li>
              <li>Direct access to the PawCircle community</li>
              <li>Connect directly with pet owners and pet service providers</li>
              <li>No booking commissions</li>
              <li>No hidden platform fees</li>
            </ul>

            <div className="membership__summary">
              <p><strong>Membership Type:</strong> Founder Membership</p>
              <p><strong>Billing:</strong> Annual</p>
              <p><strong>Platform Commission:</strong> None</p>
              <p><strong>Contact:</strong> Members choose when to share phone or email</p>
            </div>

            <Link to="/account" className="btn">
              Account Settings
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MembershipDetails;