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
              Choose which PawCircle updates and activity notifications you
              would like to receive.
            </p>

            <div className="services__checkboxes">
              <label><input type="checkbox" /> New Messages</label>
              <label><input type="checkbox" /> Message Replies</label>
              <label><input type="checkbox" /> Membership Updates</label>
            </div>
          </div>

          <div className="settings__card">
            <h3>Communication Preferences</h3>

            <p>
              Choose how you would like to communicate with other PawCircle
              members after the first introduction.
            </p>

            <div className="services__checkboxes">
              <label><input type="checkbox" /> In-App Messages</label>
              <label><input type="checkbox" /> Email Notifications</label>
              <label><input type="checkbox" /> Share Contact Information After Initial Conversation</label>
            </div>
          </div>

          <div className="settings__card">
            <h3>Profile Visibility</h3>

            <p>
              Control how your profile appears to other PawCircle members.
            </p>

            <div className="contact__visibility">
              <label htmlFor="profileVisibility">
                Profile Visibility
              </label>

              <select id="profileVisibility">
                <option>Show my profile to PawCircle members</option>
                <option>Only show my profile when I contact someone</option>
              </select>
            </div>
          </div>

          <div className="settings__card">
            <h3>Member Preferences</h3>

            <p>
              Select the types of pet care services you are interested in
              offering or finding through PawCircle.
            </p>

            <div className="services__checkboxes">
              <label><input type="checkbox" /> Dog Walking</label>
              <label><input type="checkbox" /> Drop-In Visits</label>
              <label><input type="checkbox" /> Pet Sitting</label>
              <label><input type="checkbox" /> Overnight Care</label>
              <label><input type="checkbox" /> Cat Care</label>
              <label><input type="checkbox" /> Pet Taxi</label>
            </div>
          </div>

          <div className="settings__card">
            <h3>Availability Status</h3>

            <p>
              Let other members know whether you are currently accepting new
              requests.
            </p>

            <div className="availability__options">
              <label className="availability__option">
                <input
                  type="radio"
                  name="availability"
                  value="accepting"
                  defaultChecked
                />
                <span className="status-circle status-circle--green"></span>
                Accepting New Requests
              </label>

              <label className="availability__option">
                <input
                  type="radio"
                  name="availability"
                  value="limited"
                />
                <span className="status-circle status-circle--yellow"></span>
                Limited Availability
              </label>

              <label className="availability__option">
                <input
                  type="radio"
                  name="availability"
                  value="closed"
                />
                <span className="status-circle status-circle--red"></span>
                Not Accepting New Requests
              </label>
            </div>
          </div>

          <div className="settings__card">
            <h3>Account Management</h3>

            <p>
              Review your membership information and account preferences.
            </p>

            <Link to="/details" className="btn">
              View Membership Details
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AccountSettings;