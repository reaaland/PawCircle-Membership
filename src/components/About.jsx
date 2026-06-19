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
                <span className="purple">PawCircle</span> helps pet owners and pet caregivers connect directly within their local community.
              </p>

              <p>
                Simple memberships. Direct connections. No commissions or hidden fees.
              </p>
            </div>

            <div className="about__card">
              <h3>Our Mission</h3>

              <p>
                <span className="purple">PawCircle</span> was created to help pet owners and pet service providers connect directly within their local communities through a simple membership model.
              </p>

              <p>
                Our goal is to provide an affordable and straightforward way for members to find one another, make an introduction, and connect directly for their pet care needs. No commissions, no rankings, and no booking fees—just direct connections between members.
              </p>
            </div>

            <div className="about__card">
              <h3>Our Vision</h3>

              <p>
                <span className="purple">PawCircle</span> began with a simple idea: helping pet owners and pet service providers connect directly in their communities.
              </p>

              <p>
               We are launching in the United States with the goal of building a nationwide membership platform where pet owners can explore provider profiles, choose who they would like to contact, and make direct introductions on their own terms. Pet service providers can create professional profiles, showcase their services, and build connections with pet owners seeking local pet care.
              </p>

              <p>
                As <span className="purple">PawCircle</span> grows, we hope to expand beyond the United States so more communities can benefit from simple memberships and direct local pet care connections.
              </p>
            </div>

            <div className="about__card">
              <h3>Why Membership?</h3>

              <p>
                <span className="purple">PawCircle</span> uses a simple membership model to help pet owners and pet service providers
                connect directly.
              </p>

              <p>
                Membership helps keep the platform affordable, straightforward, and focused on helping pet owners and pet service providers connect directly — without booking fees, commissions, or surprise costs.
              </p>
            </div>
          </div>

          {fullVersion && (
            <p className="about__disclaimer">
            <span className="purple">PawCircle</span>{" "}
            helps members connect directly and does not provide pet care services.
            PawCircle does not conduct background checks, verify credentials, employ pet
            service providers, or guarantee services. Members are responsible for
            screening providers, checking references, establishing agreements, handling
            payment arrangements, and making pet care decisions.
          </p>
          )}
        </div>
      </div>
    </section>
  );
}

export default About;