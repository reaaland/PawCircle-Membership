function Profile() {
  return (
    <section id="profile">
      <div className="container">
        <div className="row row__column">
          <h2>My Profile</h2>

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
  <label>Services Comfortable Offering</label>

  <div className="checkbox__group">
    <label>
      <input type="checkbox" /> Dog Walking
    </label>

    <label>
      <input type="checkbox" /> Drop-In Visits
    </label>

    <label>
      <input type="checkbox" /> Pet Sitting
    </label>

    <label>
      <input type="checkbox" /> Overnight Care
    </label>

    <label>
      <input type="checkbox" /> Boarding
    </label>

    <label>
      <input type="checkbox" /> Cat Care
    </label>

    <label>
      <input type="checkbox" /> Pet Taxi
    </label>

    <label>
      <input type="checkbox" /> Medication Support
    </label>
  </div>
</div>

              <div className="form__group">
                <label htmlFor="bio">Bio</label>
                <textarea
                  id="bio"
                  placeholder="Share a little about yourself, your pets, or your pet services."
                ></textarea>
              </div>

              <button className="btn" type="button">
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