import { Link } from "react-router-dom";
import { availabilityStatuses } from "../Config/membershipConfig";

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
              <label><input type="checkbox" /> PawCircle Announcements</label>
            </div>
          </div>

          <div className="settings__card">
            <h3>Privacy Preferences</h3>

            <p>
              Control how your profile and contact preferences appear to other
              PawCircle members.
            </p>

            <div className="contact__visibility">
              <label htmlFor="profileVisibility">
                Profile Visibility
              </label>

              <select id="profileVisibility">
                <option>
                  Show my profile to PawCircle members
                </option>

                <option>
                  Only show my profile when I contact someone
                </option>
              </select>
            </div>
          </div>

          <div className="settings__card">
            <h3>Provider Availability</h3>

            <p>
              Let pet owners know whether you are currently accepting new client
              requests.
            </p>

            <div className="availability__options">
              {availabilityStatuses.map((status) => (
                <label
                  key={status.value}
                  className="availability__option"
                >
                  <input
                    type="radio"
                    name="availabilityStatus"
                    value={status.value}
                    defaultChecked={status.value === "accepting"}
                  />

                  <span>{status.label}</span>
                </label>
              ))}
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