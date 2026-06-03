function About() {
  return (
    <section id="about">
      <div className="container">
        <div className="row">
          <h2>
            About <span className="purple">PawCircle</span>
          </h2>

          <div className="about__grid">
            <div className="about__card">
              <h3>
                What is <span className="purple">PawCircle</span>?
              </h3>

              <p>
                <span className="purple">PawCircle</span> helps pet owners and
                pet caregivers connect directly within their local community.
              </p>

              <p>
                Simple memberships. Direct connections. No commissions or hidden fees.
              </p>
            </div>

            <div className="about__card">
              <h3>Why Membership?</h3>

              <p>
                <span className="purple">PawCircle</span> uses a simple membership
                model to help pet owners and pet service providers connect directly.
              </p>

              <p>
                Membership helps keep the platform affordable, community-focused,
                and centered on real connections — without booking fees,
                commissions, or surprise costs.
              </p>
            </div>

            <p className="about__disclaimer">
              PawCircle helps members connect and does not provide pet care services
              directly. Members are responsible for screening providers, agreements,
              payment, and pet care decisions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;