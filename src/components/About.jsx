import sunsetWalk from "../assets/huskies_at_twilight.jpeg";

function About({ fullVersion }) {
  return (
    <section id="about">
      <div className="container">
        <div className="row">
          <h2>
            About <span className="purple">PawCircle</span>
          </h2>

          <div className="about__hero">
            <img
              src={sunsetWalk}
              alt="Walking dogs at sunset"
              className="about__hero--img"
            />
          </div>

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
                Simple memberships. Direct connections. No commissions or
                hidden fees.
              </p>
            </div>

            <div className="about__card">
              <h3>Our Mission</h3>

              <p>
                PawCircle was created to help pet owners and pet caregivers
                connect directly within their communities through a simple
                membership model.
              </p>

              <p>
                Our goal is to create an affordable, community-focused platform
                where members can communicate directly, build relationships, and
                choose the pet care solutions that work best for them.
              </p>
            </div>

            <div className="about__card">
              <h3>Our Vision</h3>

              <p>
                PawCircle began with a simple idea: helping pet owners and pet
                caregivers connect directly in their communities.
              </p>

              <p>
                We are launching in the United States with the goal of building
                a nationwide membership community where pet owners and pet
                caregivers can connect, communicate, and build lasting
                relationships.
              </p>

              <p>
                As PawCircle grows, we hope to expand beyond the United States
                and create a global community of pet lovers connected through
                care and shared experiences.
              </p>
            </div>

            <div className="about__card">
              <h3>Why Membership?</h3>

              <p>
                <span className="purple">PawCircle</span> uses a simple
                membership model to help pet owners and pet service providers
                connect directly.
              </p>

              <p>
                Membership helps keep the platform affordable, community-focused,
                and centered on real connections — without booking fees,
                commissions, or surprise costs.
              </p>
            </div>
          </div>

          {fullVersion && (
            <p className="about__disclaimer">
              PawCircle helps members connect and does not provide pet care
              services directly. Members are responsible for screening providers,
              agreements, payment, and pet care decisions.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

export default About;