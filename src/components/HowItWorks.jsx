function HowItWorks() {
  return (
    <section className="how-it-works">
      <div className="container">
        <div className="row">
          <h2>How PawCircle Works</h2>

          <p className="how__intro">
            PawCircle helps pet owners and pet service providers connect
            directly through a simple membership community.
          </p>

          <div className="how__cards">
            <div className="how__card">
              <h3>1. Join PawCircle</h3>
              <p>
                Choose a membership and create your PawCircle account.
              </p>
            </div>

            <div className="how__card">
              <h3>2. Browse Providers</h3>
              <p>
                Search provider profiles by service, name, or location.
              </p>
            </div>

            <div className="how__card">
              <h3>3. Start a Conversation</h3>
              <p>
                Send an introductory message through PawCircle and learn more
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