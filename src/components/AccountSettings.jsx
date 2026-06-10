function AccountSettings() {
  return (
    <section id="account-settings">
      <div className="container">
        <div className="row row__column">
          <h2>Account Settings</h2>

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