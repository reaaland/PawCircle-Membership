import { Link, useNavigate } from "react-router-dom";

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