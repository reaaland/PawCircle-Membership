import { Link, useLocation } from "react-router-dom";
import dogWalking from "../assets/dog-walking-trail.webp";
import { buildProviderJoinUrl } from "../utils/signupTracking";
import "./ForProvidersPage.css";

const benefits = [
  {
    title: "Keep what you earn",
    text: "PawCircle Membership does not take a percentage of the work you arrange with pet owners.",
  },
  {
    title: "Be found locally",
    text: "Create a profile that helps nearby pet owners discover your services and availability.",
  },
  {
    title: "Connect directly",
    text: "Start the conversation through PawCircle, then decide together whether you are a good fit.",
  },
];

function ForProvidersPage() {
  const location = useLocation();
  const joinUrl = buildProviderJoinUrl(location.search);

  return (
    <div className="providers-landing">
      <section className="providers-hero">
        <div className="container providers-hero__grid">
          <div className="providers-hero__copy">
            <span className="providers-eyebrow">For pet service providers</span>
            <h1>
              Keep more of <span className="purple">what you earn.</span>
            </h1>
            <p className="providers-hero__lead">
              Give local pet owners another way to find you—without PawCircle
              taking a commission from every job.
            </p>
            <p className="providers-hero__support">
              You do not have to leave Rover, Wag, or the client relationships
              you already have. Add PawCircle as another path to build your
              local presence and connect directly.
            </p>
            <div className="providers-hero__actions">
              <Link to={joinUrl} className="btn">
                Join as a Pet Service Provider
              </Link>
              <a href="#how-it-works-for-providers" className="btn btn--outline">
                See How It Works
              </a>
            </div>
            <p className="providers-hero__note">
              Founder Membership is currently $10/year for the first 500
              members.
            </p>
          </div>

          <figure className="providers-hero__image-wrap">
            <img
              src={dogWalking}
              alt="Pet service provider walking dogs on a trail"
              className="providers-hero__image"
            />
          </figure>
        </div>
      </section>

      <section className="providers-benefits" aria-labelledby="provider-benefits-title">
        <div className="container">
          <div className="providers-section-heading">
            <span className="providers-eyebrow">A simple additional channel</span>
            <h2 id="provider-benefits-title">Your work. Your relationships. Your earnings.</h2>
            <p>
              PawCircle is built to help independent pet care providers become
              visible in the communities they serve.
            </p>
          </div>

          <div className="providers-benefit-grid">
            {benefits.map((benefit) => (
              <article className="providers-benefit-card" key={benefit.title}>
                <span className="providers-benefit-card__paw" aria-hidden="true">
                  🐾
                </span>
                <h3>{benefit.title}</h3>
                <p>{benefit.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        className="providers-how"
        id="how-it-works-for-providers"
        aria-labelledby="providers-how-title"
      >
        <div className="container providers-how__grid">
          <div>
            <span className="providers-eyebrow">Start without starting over</span>
            <h2 id="providers-how-title">Use PawCircle alongside what already works.</h2>
            <p>
              Keep the profiles and clients you have built elsewhere. PawCircle
              gives you an additional local profile and a direct way to hear
              from pet owners who find you here.
            </p>
          </div>

          <ol className="providers-steps">
            <li>
              <span>1</span>
              <div>
                <h3>Join as a Founder</h3>
                <p>Choose “Pet Service Provider” as your role at signup.</p>
              </div>
            </li>
            <li>
              <span>2</span>
              <div>
                <h3>Build your local profile</h3>
                <p>Add your services, area, experience, and availability.</p>
              </div>
            </li>
            <li>
              <span>3</span>
              <div>
                <h3>Connect with pet owners</h3>
                <p>Talk directly and decide whether each opportunity fits.</p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      <section className="providers-founder" aria-labelledby="providers-founder-title">
        <div className="container">
          <div className="providers-founder__card">
            <span className="providers-founder__badge">First 500 Members</span>
            <p className="providers-founder__kicker">Founder Membership</p>
            <h2 id="providers-founder-title">$10/year</h2>
            <p>
              Lock in Founder pricing while your membership remains active.
              Select Pet Service Provider during signup so your profile is set
              up for the work you offer.
            </p>
            <ul>
              <li>No PawCircle commission on your work</li>
              <li>A local provider profile</li>
              <li>Direct member-to-member messaging</li>
            </ul>
            <Link to={joinUrl} className="btn">
              Choose Provider & Join
            </Link>
          </div>
        </div>
      </section>

      <section className="providers-disclaimer">
        <div className="container">
          <p>
            PawCircle Membership is a membership directory and connection
            service. It is not an employer, pet care agency, or booking
            platform, and membership does not guarantee clients or bookings.
          </p>
        </div>
      </section>
    </div>
  );
}

export default ForProvidersPage;
