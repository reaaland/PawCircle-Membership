function HowItWorks() {
  return (
    <section className="how-it-works">
      <div className="container">
        <div className="row">
          <h2>How <span className="purple">PawCircle Membership</span> Works</h2>

          <p className="how__intro">
            The demo shows how pet owners could find local care and how providers could present their services through clear profiles and direct conversations.
          </p>

          <div className="how__cards">
            <div className="how__card">
              <h3>1. Choose a Perspective</h3>
              <p>
                Preview the product as a pet owner, service provider, or both.
              </p>
            </div>

            <div className="how__card">
              <h3>2. Create a Profile</h3>
              <p>
                Fictional profiles show services, experience, availability, and care needs.
              </p>
            </div>

            <div className="how__card">
              <h3>3. Find Local Pet Care</h3>
              <p>
                Browse sample provider profiles to see how owners could compare local options.
              </p>
            </div>

            <div className="how__card">
              <h3>4. Connect Directly</h3>
              <p>
                Preview a fictional introduction. No message is actually sent from the demo.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
