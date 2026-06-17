function HowItWorks() {
  return (
    <section className="how-it-works">
      <div className="container">
        <div className="row">
          <h2>How <span className="purple">PawCircle</span> Works</h2>

          <p className="how__intro">
            <span className="purple">PawCircle</span> helps pet owners and pet service providers connect
            directly through a simple membership community.
          </p>

          <div className="how__cards">
            <div className="how__card">
              <h3>1. Join <span className="purple">PawCircle</span></h3>
              <p>
                Choose a membership and create your <span className="purple">PawCircle</span> account.
              </p>
            </div>

            <div className="how__card">
              <h3>Explore Member Profiles</h3>
              <p>
              View member profiles, learn about experience and services, and discover
              connections that fit your needs.
            </p>
            </div>

            <div className="how__card">
              <h3>3. Start a Conversation</h3>
              <p>
                Send an introductory message through <span className="purple">PawCircle</span> and learn more
                about the provider.
              </p>
            </div>

            <div className="how__card">
              <h3>4. Arrange Services Directly</h3>
              <p>
                Members decide details, expectations, scheduling, and payment
                arrangements together.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;