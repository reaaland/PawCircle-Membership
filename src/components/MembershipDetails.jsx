import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import {
  getSiteSettings,
  membershipInfo,
} from "../Config/membershipConfig";

function MembershipDetails() {
  const navigate = useNavigate();
  const [founderActive, setFounderActive] = useState(true);
  const [loadingSettings, setLoadingSettings] = useState(true);
  const [accessAllowed, setAccessAllowed] = useState(false);
  const [membershipStatus, setMembershipStatus] = useState("");

  useEffect(() => {
    async function loadMembershipDetails() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        navigate("/");
        return;
      }

      const { data: profile, error } = await supabase
        .from("profiles")
        .select("membership_status")
        .or(`id.eq.${user.id},email.eq.${user.email?.toLowerCase().trim()}`)
        .maybeSingle();

      if (error || !profile) {
        navigate("/membership");
        return;
      }

      const status = profile.membership_status || "inactive";
      setMembershipStatus(status);
      setAccessAllowed(true);

      if (status !== "active") {
        setLoadingSettings(false);
        return;
      }

      const settings = await getSiteSettings();

      setFounderActive(settings.member_count < settings.founder_limit);
      setLoadingSettings(false);
    }

    loadMembershipDetails();
  }, [navigate]);

  if (!accessAllowed || loadingSettings) {
    return (
      <section id="membership-details">
        <div className="container">
          <div className="row row__column">
            <div className="profile-loading">Loading membership details...</div>
          </div>
        </div>
      </section>
    );
  }

  const returnPath = membershipStatus === "active" ? "/dashboard" : "/account";

  return (
    <section id="membership-details">
      <div className="container">
        <div className="row row__column">
          <div className="page__header">
            <h2>Membership Details</h2>

            <Link to={returnPath} className="page__close">
              ✕
            </Link>
          </div>

          <div className="membership-details__card">
            {membershipStatus !== "active" ? (
              <>
                <h3>Membership Inactive</h3>

                <p>
                  Your paid PawCircle Membership period has ended. Member-only
                  directories, profile editing, and intro messages are no longer
                  available.
                </p>

                <p>
                  Canceling does not provide a refund. Members keep full access
                  through the end of the paid billing period, and access ends
                  only after Stripe confirms the subscription has expired.
                </p>

                <div className="settings__actions">
                  <Link to="/membership" className="btn">
                    View Membership Options
                  </Link>

                  <Link to="/account" className="btn btn--secondary">
                    Account Settings
                  </Link>
                </div>
              </>
            ) : founderActive ? (
              <>
                <h3>{membershipInfo.founder.name}</h3>

                <p>{membershipInfo.founder.description}</p>

                <ul>
                  <li>{membershipInfo.founder.price}</li>
                  <li>First 500 members</li>
                  <li>Direct access to the PawCircle Membership community</li>
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
                  Explore the membership options currently available through{" "}
                  <span className="purple">PawCircle Membership.</span>
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

            {membershipStatus === "active" && (
              <Link to="/dashboard" className="btn">
                Back to Dashboard
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default MembershipDetails;