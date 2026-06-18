import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  getSiteSettings,
  membershipInfo,
} from "../Config/membershipConfig";

function MembershipDetails() {
  const [founderActive, setFounderActive] = useState(true);
const [loadingSettings, setLoadingSettings] = useState(true);

useEffect(() => {
  async function loadSiteSettings() {
    const settings = await getSiteSettings();

    setFounderActive(settings.member_count < settings.founder_limit);
    setLoadingSettings(false);
  }

  loadSiteSettings();
}, []);

if (loadingSettings) {
  return <div>Loading membership details...</div>;
}
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
            {founderActive ? (
              <>
                <h3>{membershipInfo.founder.name}</h3>

                <p>{membershipInfo.founder.description}</p>

                <ul>
                  <li>{membershipInfo.founder.price}</li>
                  <li>First 500 members</li>
                  <li>Direct access to the PawCircle community</li>
                  <li>
                    Connect directly with pet owners and pet service providers
                  </li>
                  <li>No booking commissions</li>
                  <li>No hidden platform fees</li>
                </ul>

                <div className="membership__summary">
                  <p>
                    <strong>Membership Type:</strong>{" "}
                    {membershipInfo.founder.name}
                  </p>

                  <p>
                    <strong>Billing:</strong>{" "}
                    {membershipInfo.founder.billing}
                  </p>

                  <p>
                    <strong>Platform Commission:</strong> None
                  </p>

                  <p>
                    <strong>Contact:</strong> Members choose when to share phone 
                    or email
                  </p>
                </div>
              </>
            ) : (
              <>
                <h3>Available Membership Options</h3>

                <p>
                  Explore the membership options currently available through
                  PawCircle.
                </p>

                <ul>
                  <li>
                    <strong>{membershipInfo.owner.name}</strong> —{" "}
                    {membershipInfo.owner.price}
                  </li>

                  <li>
                    <strong>{membershipInfo.provider.name}</strong> —{" "}
                    {membershipInfo.provider.price}
                  </li>

                  <li>
                    <strong>{membershipInfo.both.name}</strong> —{" "}
                    {membershipInfo.both.price}
                  </li>
                </ul>

                <div className="membership__summary">
                  <p>
                    <strong>Platform Commission:</strong> None
                  </p>

                  <p>
                    <strong>Direct Connections:</strong> Yes
                  </p>

                  <p>
                    <strong>Hidden Fees:</strong> None
                  </p>
                </div>
              </>
            )}

            <Link to="/dashboard" className="btn">
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MembershipDetails;