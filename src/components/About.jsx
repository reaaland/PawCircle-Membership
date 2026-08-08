import sunsetWalk from "../assets/huskies-at-twilight.webp";

function About({ fullVersion }) {
  return (
    <section id="about">
      <div className="container">
        <div className="row">
          <h2>
            About <span className="purple">PawCircle Membership</span>
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
                What is <span className="purple">PawCircle Membership</span>?
              </h3>

              <p>
                PawCircle Membership began as a real paid platform designed to
                help pet owners and independent pet-care providers connect
                directly in their communities.
              </p>

              <p>
                The paid membership is now closed, and the application is
                preserved as an interactive portfolio project.
              </p>
            </div>

            <div className="about__card">
              <h3>Why I Built It</h3>

              <p>
                I wanted to explore a simpler way for local pet owners and
                independent providers to find one another without PawCircle
                controlling the service transaction.
              </p>

              <p>
                That idea became a working product with distinct owner and
                provider experiences, memberships, profiles, messaging, privacy
                controls, and payments.
              </p>
            </div>

            <div className="about__card">
              <h3>What I Built</h3>

              <p>
                The project includes local discovery, detailed profiles,
                role-based experiences, privacy preferences, direct
                introductions, responsive design, authentication, database
                policies, and an original Stripe subscription flow.
              </p>

              <p>
                The current public demo uses fictional data so visitors can
                explore the product without creating an account or entering
                payment information.
              </p>
            </div>

            <div className="about__card">
              <h3>Why Keep It Online?</h3>

              <p>
                PawCircle is a substantial working example of taking an idea
                through product decisions, interface design, full-stack
                development, deployment, launch, and ongoing troubleshooting.
              </p>

              <p>
                Keeping the demo online lets prospective clients and employers
                explore the work instead of seeing only screenshots.
              </p>
            </div>
          </div>

          {fullVersion && (
            <p className="about__disclaimer">
              The current PawCircle Membership demo uses fictional data. It
              does not provide pet care, list active providers, send messages,
              arrange services, or accept payments.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

export default About;
