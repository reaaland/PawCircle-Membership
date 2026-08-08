import { Link } from "react-router-dom";
import dogWalking from "../assets/dog-walking-trail.webp";
import "./ForProvidersPage.css";

const benefits = [
  {
    title: "Keep what you earn",
    text: "The original model was designed without a per-job PawCircle commission.",
  },
  {
    title: "Be found locally",
    text: "Providers could create a profile showing their services, availability, and service area.",
  },
  {
    title: "Connect directly",
    text: "Pet owners and providers could start a conversation and decide together whether the fit made sense.",
  },
];

function ForProvidersPage() {
  return (
    <div className="providers-landing">
      <section className="providers-hero">
        <div className="container providers-hero__grid">
          <div className="providers-hero__copy">
            <span className="providers-eyebrow">Original provider experience</span>
            <h1>
              Designed to help independent providers keep more of <span className="purple">what they earn.</span>
            </h1>
            <p className="providers-hero__lead">
              This page preserves the provider side of the original PawCircle
              product: a local profile, clear service information, and a direct
              way for pet owners to start a conversation without PawCircle
              taking a commission on each job.
            </p>
            <p className="providers-hero__support">
              PawCircle was meant to be another way for local pet owners to find
              independent providers, not a replacement for Rover, Wag, or the
              client relationships a provider had already built.
            </p>
            <div className="providers-hero__actions">
              <Link to="/demo?role=provider" className="btn">
                Explore the Provider Demo
              </Link>
              <a href="#how-it-works-for-providers" className="btn btn--outline">
                See the Original Flow
              </a>
            </div>
            <p className="providers-hero__note">
              Interactive demo with fictional data—no signup required.
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
            <span className="providers-eyebrow">What I wanted the provider side to do</span>
            <h2 id="provider-benefits-title">Your work. Your relationships. Your earnings.</h2>
            <p>
              The provider side of PawCircle was built to give independent pet
              care providers a simple local presence and another way for pet
              owners to find them and start a conversation.
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
            <span className="providers-eyebrow">Designed to work alongside existing tools</span>
            <h2 id="providers-how-title">Another local option without starting over.</h2>
            <p>
              Providers could keep the profiles and clients they already had
              elsewhere while using PawCircle as another place to show their
              services and hear from local pet owners.
            </p>
          </div>

          <ol className="providers-steps">
            <li>
              <span>1</span>
              <div>
                <h3>Preview the provider workspace</h3>
                <p>Choose the Service Provider perspective in the public demo.</p>
              </div>
            </li>
            <li>
              <span>2</span>
              <div>
                <h3>See the profile experience</h3>
                <p>Explore how services, area, experience, and availability were presented.</p>
              </div>
            </li>
            <li>
              <span>3</span>
              <div>
                <h3>Preview a direct introduction</h3>
                <p>See how an owner could start a conversation with a provider.</p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      <section className="providers-founder" aria-labelledby="providers-founder-title">
        <div className="container">
          <div className="providers-founder__card">
            <span className="providers-founder__badge">Interactive Demo</span>
            <p className="providers-founder__kicker">Provider Experience</p>
            <h2 id="providers-founder-title">No signup required</h2>
            <p>
              Explore how a local provider could present services, experience,
              availability, and a service area to nearby pet owners.
            </p>
            <ul>
              <li>No PawCircle commission on provider work</li>
              <li>A local provider profile</li>
              <li>Direct member-to-member introductions</li>
            </ul>
            <Link to="/demo?role=provider" className="btn">
              Open Provider Demo
            </Link>
          </div>
        </div>
      </section>

      <section className="providers-disclaimer">
        <div className="container">
          <p>
            This is a preserved demo of the original provider experience.
            PawCircle Membership is no longer an active membership or provider
            directory.
          </p>
        </div>
      </section>
    </div>
  );
}

export default ForProvidersPage;
