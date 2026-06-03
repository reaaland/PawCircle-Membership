function Services() {
  return (
    <section id="services">
      <div className="container">
        <div className="row">
          <h2>Find Local Pet Care</h2>

          <div className="request__card">
            <h2>Find Pet Care</h2>

            <p className="request__subtitle">
              Tell caregivers what you need and when you need help.
            </p>

            <htmlForm className="request__htmlForm">
              <div className="htmlForm__group">
                <label htmlhtmlFor="service">Service Needed</label>

                <select id="service" required>
                  <option value="">Select a service</option>
                  <option>Dog Walking</option>
                  <option>Drop-In Visits</option>
                  <option>Pet Sitting</option>
                  <option>House Sitting</option>
                  <option>Overnight Care</option>
                  <option>Boarding</option>
                  <option>Puppy Care</option>
                  <option>Senior Pet Care</option>
                  <option>Transportation</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="htmlForm__group">
                <label htmlhtmlFor="name">Full Name</label>

                <input
                  type="text"
                  id="name"
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div className="htmlForm__group">
                <label htmlhtmlFor="username">Username</label>

                <input
                  type="text"
                  id="username"
                  placeholder="@username"
                />
              </div>

              <div className="htmlForm__group">
                <label htmlhtmlFor="email">Email Address</label>

                <input
                  type="email"
                  id="email"
                  placeholder="you@email.com"
                  required
                />
              </div>

              <div className="htmlForm__group">
                <label htmlhtmlFor="phone">Phone Number</label>

                <input
                  type="tel"
                  id="phone"
                  placeholder="(555) 555-5555"
                />
              </div>

              <div className="htmlForm__row">
                <div className="htmlForm__group">
                  <label htmlhtmlFor="start-date">Care Needed From</label>

                  <input type="date" id="start-date" required />
                </div>

                <div className="htmlForm__group">
                  <label htmlhtmlFor="end-date">Care Needed Until</label>

                  <input type="date" id="end-date" required />
                </div>
              </div>

              <div className="htmlForm__group">
                <label htmlhtmlFor="details">Additional Details</label>

                <textarea
                  id="details"
                  rows="5"
                  placeholder="Tell caregivers about your pet, schedule, special needs, or anything helpful..."
                ></textarea>
              </div>

              <button className="btn" type="submit">
                Find Pet Care
              </button>
            </htmlForm>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Services;