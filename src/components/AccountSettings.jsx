import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

function AccountSettings() {
  const navigate = useNavigate();
  const [showCancelWarning, setShowCancelWarning] = useState(false);
  const [accessAllowed, setAccessAllowed] = useState(false);
  const [membershipStatus, setMembershipStatus] = useState("");

  useEffect(() => {
    async function checkAccess() {
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

      setMembershipStatus(profile.membership_status || "inactive");
      setAccessAllowed(true);
    }

    checkAccess();
  }, [navigate]);

  if (!accessAllowed) {
    return (
      <section id="account-settings">
        <div className="container">
          <div className="row row__column">
            <div className="profile-loading">Checking membership...</div>
          </div>
        </div>
      </section>
    );
  }

  const membershipActive = membershipStatus === "active";
  const returnPath = membershipActive ? "/dashboard" : "/details";

  return (
    <section id="account-settings">
      <div className="container">
        <div className="row row__column">
          <div className="page__header">
            <h2>Account Settings</h2>

            <Link to={returnPath} className="page__close">
              ✕
            </Link>
          </div>

          <div className="settings__card">
            <h3>Membership Status</h3>

            <p>
              <strong>Status:</strong>{" "}
              {membershipActive ? "Active" : "Inactive"}
            </p>

            {membershipActive ? (
              <p>
                Your member access remains available through the end of your
                paid billing period, including after a cancellation is
                scheduled.
              </p>
            ) : (
              <p>
                Your paid membership period has ended. You may still review
                account information, contact support, or rejoin PawCircle.
              </p>
            )}
          </div>

          {membershipActive ? (
            <>
              <div className="settings__card">
                <h3>Profile Settings</h3>

                <p>
                  Update your profile information, services, availability,
                  contact preferences, and visibility settings.
                </p>

                <Link to="/profile" className="btn">
                  Edit Profile
                </Link>
              </div>

              <div className="settings__card">
                <h3>Message Center</h3>

                <p>View incoming messages and PawCircle introductions.</p>

                <Link to="/messages" className="btn">
                  Open Message Center
                </Link>
              </div>
            </>
          ) : (
            <div className="settings__card">
              <h3>Member Features Unavailable</h3>

              <p>
                Profile editing, member directories, and intro messages become
                unavailable after the paid membership period ends.
              </p>
            </div>
          )}

          <div className="settings__card">
            <h3>Membership</h3>

            <p>
              Review your membership status, pricing, and account details.
            </p>

            <div className="settings__actions">
              <Link to="/details" className="btn">
                View Membership Details
              </Link>

              {membershipActive ? (
                <button
                  className="btn btn--secondary"
                  onClick={() => setShowCancelWarning(true)}
                >
                  Manage or Cancel Membership
                </button>
              ) : (
                <Link to="/membership" className="btn btn--secondary">
                  View Membership Options
                </Link>
              )}
            </div>
          </div>

          {showCancelWarning && membershipActive && (
            <div className="modal__backdrop">
              <div className="modal">
                <h3>Manage or Cancel Membership</h3>

                <p>
                  Canceling does not provide a refund. Your PawCircle access
                  continues through the end of the current paid billing period.
                </p>

                <p>
                  If you are a Founder Member and cancel your membership, you
                  will no longer be eligible for the $10/year Founder price
                  guarantee if you rejoin later.
                </p>

                <div className="modal__actions">
                  <button
                    className="btn btn--secondary"
                    onClick={() => setShowCancelWarning(false)}
                  >
                    Go Back
                  </button>

                  <a
                    href="https://billing.stripe.com/p/login/14A6oHbhs05u4zdeLscAo00"
                    className="btn"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Continue to Stripe
                  </a>
                </div>
              </div>
            </div>
          )}

          <div className="settings__card">
            <h3>Support</h3>

            <p>Questions about your account, membership, or PawCircle profile?</p>

            <Link to="/contact" className="btn">
              Contact PawCircle
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AccountSettings;