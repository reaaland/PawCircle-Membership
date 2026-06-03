function Join() {
  return (
    <section id="join">
      <div className="container">
        <div className="row row__column">
          <h2>Join PawCircle</h2>

          <p>Start connecting pet owners and caregivers directly.</p>

          <form className="join-form">
            <div className="form__group">
              <label htmlFor="member__type">Membership Type</label>

              <select id="member__type" required>
                <option value="">Select membership type</option>
                <option value="owner">Pet Owner</option>
                <option value="provider">Pet Service Provider</option>
                <option value="both">Both Pet Owner & Provider</option>
              </select>
            </div>

            <div className="form__group">
              <label htmlFor="name">Full Name</label>

              <input
                type="text"
                id="name"
                placeholder="Enter your name"
                required
              />
            </div>

            <div className="form__group">
              <label htmlFor="username">Username</label>

              <input type="text" id="username" placeholder="@username" />
            </div>

            <div className="form__group">
              <label htmlFor="email">Email Address</label>

              <input
                type="email"
                id="email"
                placeholder="you@email.com"
                required
              />
            </div>

            <div className="form__group">
              <label htmlFor="phone">Phone Number</label>

              <input type="tel" id="phone" placeholder="(555) 555-5555" />
            </div>

            <button className="btn" type="submit">
              Start Membership
            </button>
          </form>

          <div className="join__benefits">
            ✓ Cancel anytime <br />
            ✓ No booking commissions <br />
            ✓ No hidden fees
          </div>
        </div>
      </div>
    </section>
  );
}

export default Join;