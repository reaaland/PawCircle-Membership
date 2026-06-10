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
            <h3>Notifications</h3>

            <p>
              Manage how you receive updates, messages, and important account
              information.
            </p>
          </div>

          <div className="settings__card">
            <h3>Privacy Preferences</h3>

            <p>
              Control profile visibility and decide how other members can
              connect with you.
            </p>
          </div>

          <div className="settings__card">
            <h3>Account Management</h3>

            <p>
              Review account information and membership preferences from one
              central location.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AccountSettings;