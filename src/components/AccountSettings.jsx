import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

function AccountSettings() {
  const navigate = useNavigate();
  const [showCancelWarning, setShowCancelWarning] = useState(false);
  const [accessAllowed, setAccessAllowed] = useState(false);

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
        .single();

      if (error || profile?.membership_status !== "active") {
        navigate("/membership");
        return;
      }

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

  return (
    <section id="account-settings">
      <div className="container">
        <div className="row row__column">
          <div className="page__header">
            <h2>Account Settings</h2>

            <Link to="/dashboard" className="page__close">
              ✕
            </Link>
          </div>

          <div className="settings__card">
            <h3>Profile Settings</h3>

            <p>
              Update your profile information, services, availability, contact
              preferences, and visibility settings.
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

          <div className="settings__card">
            <h3>Membership</h3>

            <p>
              Review your membership type, status, pricing, and account details.
            </p>

            <div className="settings__actions">
              <Link to="/details" className="btn">
                View Membership Details
              </Link>

              <button
                className="btn btn--secondary"
                onClick={() => setShowCancelWarning(true)}
              >
                Manage or Cancel Membership
              </button>
            </div>
          </div>

          {showCancelWarning && (
            <div className="modal__backdrop">
              <div className="modal">
                <h3>Manage or Cancel Membership</h3>

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

            <p>
              Questions about your account, membership, or PawCircle profile?
            </p>

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