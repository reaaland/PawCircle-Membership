import { Link } from "react-router-dom";

function AccountSettings() {
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

            <p>
              View incoming messages and PawCircle introductions.
            </p>

            <Link to="/messages" className="btn">
              Open Message Center
            </Link>
          </div>

          <div className="settings__card">
            <h3>Membership</h3>

            <p>
              Review your membership type, status, pricing, and account details.
            </p>

            <Link to="/details" className="btn">
              View Membership Details
            </Link>
          </div>

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