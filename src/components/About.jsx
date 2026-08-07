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
                <span className="purple">PawCircle Membership</span> is a portfolio demonstration of a local platform concept for pet owners and pet service providers.
              </p>

              <p>
                Local discovery. Direct introductions. Clear, role-based experiences.
              </p>
            </div>

            <div className="about__card">
              <h3>Our Mission</h3>

              <p>
                <span className="purple">PawCircle Membership</span> was created to explore how pet owners and independent providers could connect more directly within their local communities.
              </p>

              <p>
                The current goal is to demonstrate the product thinking, interface design, and full-stack implementation behind that idea.
              </p>
            </div>

            <div className="about__card">
              <h3>What the Project Demonstrates</h3>

              <p>
                <span className="purple">PawCircle Membership</span> began with a simple idea: helping pet owners and pet service providers connect directly in their communities.
              </p>

              <p>
              The project demonstrates local discovery, detailed profiles, privacy preferences, direct introductions, responsive design, and distinct owner and provider workflows.
              </p>

              <p>
                The public version uses fictional data and does not create accounts, send messages, arrange services, or accept payments.
              </p>
            </div>

            <div className="about__card">
              <h3>Why Keep It Online?</h3>

              <p>
                PawCircle is a substantial working example of how PawCircle LLC approaches business strategy, user experience, frontend development, and backend integration.
              </p>

              <p>
                Keeping a safe demonstration online allows prospective web-design clients to explore the work instead of seeing only static screenshots.
              </p>
            </div>
          </div>

          {fullVersion && (
            <p className="about__disclaimer">
            <span className="purple">PawCircle Membership</span>{" "}
            is a fictional portfolio demonstration. It does not provide pet
            care, list active providers, conduct background checks, send
            messages, arrange services, or accept payments.
          </p>
          )}
        </div>
      </div>
    </section>
  );
}

export default About;
