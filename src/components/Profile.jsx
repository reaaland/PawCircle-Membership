import { Link, useNavigate } from "react-router-dom";
import { availabilityStatuses } from "../Config/membershipConfig";

function Profile() {
  const navigate = useNavigate();

  function handleSave() {
    navigate("/dashboard");
  }

  return (
    <section id="profile">
      <div className="container">
        <div className="row row__column">
          <div className="page__header">
            <h2>My Profile</h2>

            <Link to="/dashboard" className="page__close">
              ✕
            </Link>
          </div>

          <div className="profile__card">
            <h3>Member Information</h3>

            <form className="profile__form">
              <div className="form__group">
                <label htmlFor="displayName">Display Name</label>
                <input type="text" id="displayName" placeholder="Your name" />
              </div>

              <div className="form__group">
                <label htmlFor="username">Username</label>
                <input type="text" id="username" placeholder="@username" />
              </div>

              <div className="form__group">
                <label htmlFor="city">City</label>
                <input type="text" id="city" placeholder="Your city" />
              </div>

              <div className="form__group">
                <label htmlFor="state">State</label>
                <input type="text" id="state" placeholder="State" />
              </div>

              <div className="form__group">
                <label htmlFor="state">State</label>

                <select id="state">
                  <option value="">Select State</option>
                  <option value="AL">Alabama</option>
                  <option value="AK">Alaska</option>
                  <option value="AZ">Arizona</option>
                  <option value="AR">Arkansas</option>
                  <option value="CA">California</option>
                  <option value="CO">Colorado</option>
                  <option value="CT">Connecticut</option>
                  <option value="DE">Delaware</option>
                  <option value="FL">Florida</option>
                  <option value="GA">Georgia</option>
                  <option value="HI">Hawaii</option>
                  <option value="ID">Idaho</option>
                  <option value="IL">Illinois</option>
                  <option value="IN">Indiana</option>
                  <option value="IA">Iowa</option>
                  <option value="KS">Kansas</option>
                  <option value="KY">Kentucky</option>
                  <option value="LA">Louisiana</option>
                  <option value="ME">Maine</option>
                  <option value="MD">Maryland</option>
                  <option value="MA">Massachusetts</option>
                  <option value="MI">Michigan</option>
                  <option value="MN">Minnesota</option>
                  <option value="MS">Mississippi</option>
                  <option value="MO">Missouri</option>
                  <option value="MT">Montana</option>
                  <option value="NE">Nebraska</option>
                  <option value="NV">Nevada</option>
                  <option value="NH">New Hampshire</option>
                  <option value="NJ">New Jersey</option>
                  <option value="NM">New Mexico</option>
                  <option value="NY">New York</option>
                  <option value="NC">North Carolina</option>
                  <option value="ND">North Dakota</option>
                  <option value="OH">Ohio</option>
                  <option value="OK">Oklahoma</option>
                  <option value="OR">Oregon</option>
                  <option value="PA">Pennsylvania</option>
                  <option value="RI">Rhode Island</option>
                  <option value="SC">South Carolina</option>
                  <option value="SD">South Dakota</option>
                  <option value="TN">Tennessee</option>
                  <option value="TX">Texas</option>
                  <option value="UT">Utah</option>
                  <option value="VT">Vermont</option>
                  <option value="VA">Virginia</option>
                  <option value="WA">Washington</option>
                  <option value="WV">West Virginia</option>
                  <option value="WI">Wisconsin</option>
                  <option value="WY">Wyoming</option>
                </select>
              </div>
               

              <div className="form__group">
                <label htmlFor="serviceRadiusMiles">Service Area</label>
                <select id="serviceRadiusMiles">
                  <option value="">Select service area</option>
                  <option value="5">Within 5 miles</option>
                  <option value="10">Within 10 miles</option>
                  <option value="25">Within 25 miles</option>
                  <option value="50">Within 50 miles</option>
                  <option value="100">Within 100+ miles</option>
                </select>
              </div>

              <div className="form__group">
                <label htmlFor="profileType">Profile Type</label>
                <select id="profileType">
                  <option>Pet Owner</option>
                  <option>Pet Service Provider</option>
                  <option>Pet Owner + Provider</option>
                </select>
              </div>

             
              <div className="form__group">
                <label>Contact Preferences</label>

                <p className="profile__helper">
                  Choose how you prefer to be contacted and when your contact
                  information should be shared.
                </p>

                <div className="services__checkboxes">
                  <label><input type="checkbox" /> PawCircle Messages</label>
                  <label><input type="checkbox" /> Text Message</label>
                  <label><input type="checkbox" /> Phone Call</label>
                  <label><input type="checkbox" /> Email</label>
                </div>

                <div className="contact__visibility">
                  <label htmlFor="contactVisibility">
                    Contact Information Visibility
                  </label>

                  <select id="contactVisibility">
                    <option>Share after initial PawCircle conversation</option>
                    <option>Show contact information on my profile</option>
                    <option>Only use PawCircle Messages</option>
                  </select>
                </div>
              </div>

              <div className="form__group">
                <label>Services</label>

                <p className="profile__helper">
                  Select all services you offer, are seeking, or are comfortable
                  providing.
                </p>

                <div className="services__checkboxes">
                  <label><input type="checkbox" /> Dog Walking</label>
                  <label><input type="checkbox" /> Drop-In Visits</label>
                  <label><input type="checkbox" /> Pet Sitting</label>
                  <label><input type="checkbox" /> Overnight Care</label>
                  <label><input type="checkbox" /> House Sitting</label>
                  <label><input type="checkbox" /> Boarding</label>
                  <label><input type="checkbox" /> Cat Care</label>
                  <label><input type="checkbox" /> Pet Taxi</label>
                  <label><input type="checkbox" /> Medication Support</label>
                  <label><input type="checkbox" /> Puppy Care</label>
                  <label><input type="checkbox" /> Senior Pet Care</label>
                  <label><input type="checkbox" /> Small Animal Care</label>
                  <label><input type="checkbox" /> Reptile Care</label>
                  <label><input type="checkbox" /> Bird Care</label>
                  <label><input type="checkbox" /> Farm Animal Care</label>
                  <label><input type="checkbox" /> Hobby Farm Services</label>
                </div>
              </div>

              <div className="form__group">
                <label htmlFor="yearsExperience">Years of Experience</label>
                <input
                  type="number"
                  id="yearsExperience"
                  min="0"
                  placeholder="0"
                />
              </div>

              <div className="form__group">
                <label htmlFor="experience">Experience</label>
                <textarea
                  id="experience"
                  placeholder="Tell members about your experience caring for pets, animals, farm animals, or related services."
                ></textarea>
              </div>

              <div className="form__group">
                <label htmlFor="bio">Bio</label>
                <textarea
                  id="bio"
                  placeholder="Introduce yourself to the PawCircle community."
                ></textarea>
              </div>

              <button className="btn" type="button" onClick={handleSave}>
                Save Profile
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Profile;