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
                <span className="purple">PawCircle</span> is a membership platform that helps pet owners find local pet service providers and helps pet service providers build connections within their communities.
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
                Our goal is to provide an affordable and straightforward way for members to connect, make introductions, and communicate directly without booking fees, commissions, rankings, or platform-controlled transactions.
              </p>
            </div>

            <div className="about__card">
              <h3>Our Vision</h3>

              <p>
                <span className="purple">PawCircle</span> began with a simple idea: helping pet owners and pet service providers connect directly in their communities.
              </p>

              <p>
              We envision a nationwide membership community where pet owners can discover local pet care options and pet service providers can showcase their services, experience, and availability. PawCircle gives members a simple way to make introductions and build local connections without commissions, rankings, or booking fees.
              </p>

              <p>
                As <span className="purple">PawCircle</span> grows, we hope to expand beyond the United States so more communities can benefit from simple memberships and direct local pet care connections.
              </p>
            </div>

            <div className="about__card">
              <h3>Why Membership?</h3>

              <p>
                Membership gives pet owners access to provider directories, profile creation, and the ability to make direct introductions within their local pet community.
              </p>

              <p>
                Membership also gives pet service providers a place to showcase their services, availability, experience, and business information to potential clients..
              </p>

              <p>
               Memberships help keep PawCircle affordable, community-focused, and free from booking commissions, rankings, and surprise platform fees.
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