import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import trailWalk from "../assets/dog-walking-trail.webp";
import catCare from "../assets/cat-window.webp";
import boarding from "../assets/boarding-two-pups.webp";

const roleOptions = [
  { key: "owner", label: "Pet Owner" },
  { key: "provider", label: "Service Provider" },
  { key: "both", label: "Owner + Provider" },
];

const providers = [
  {
    name: "North Star Pet Walks",
    location: "Minneapolis, MN",
    service: "Dog Walking · Drop-In Visits",
    availability: "Accepting new clients",
    image: trailWalk,
  },
  {
    name: "Whisker Watch",
    location: "St. Paul, MN",
    service: "Cat Care · Medication Visits",
    availability: "Limited availability",
    image: catCare,
  },
  {
    name: "Lakeside Home Boarding",
    location: "Bloomington, MN",
    service: "Boarding · Overnight Care",
    availability: "Accepting new clients",
    image: boarding,
  },
];

const roleCopy = {
  owner: {
    eyebrow: "Pet-owner workspace",
    title: "Find a local care option and start a conversation.",
    summary:
      "Browse fictional providers, compare service areas and availability, then preview a private introduction.",
  },
  provider: {
    eyebrow: "Provider workspace",
    title: "Show local pet owners what you offer.",
    summary:
      "Preview how an independent provider could present services, experience, availability, and a direct inquiry.",
  },
  both: {
    eyebrow: "Combined workspace",
    title: "Move between finding care and offering services.",
    summary:
      "This concept supports people who are pet owners, service providers, or both without creating duplicate accounts.",
  },
};

function DemoPage() {
  const [searchParams] = useSearchParams();
  const requestedRole = searchParams.get("role");
  const initialRole = roleOptions.some((role) => role.key === requestedRole)
    ? requestedRole
    : "owner";
  const [role, setRole] = useState(initialRole);
  const activeCopy = roleCopy[role];

  return (
    <div className="product-demo">
      <section className="product-demo__hero">
        <div className="container">
          <div className="row row__column">
            <span className="section__tag">Interactive portfolio demo</span>
            <h1>{activeCopy.title}</h1>
            <p>{activeCopy.summary}</p>

            <div className="product-demo__role-switcher" aria-label="Choose a demo view">
              {roleOptions.map((option) => (
                <button
                  type="button"
                  key={option.key}
                  className={role === option.key ? "is-active" : ""}
                  aria-pressed={role === option.key}
                  onClick={() => setRole(option.key)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="product-demo__workspace">
        <div className="container">
          <div className="row">
            <div className="product-demo__workspace-heading">
              <div>
                <span>{activeCopy.eyebrow}</span>
                <h2>{role === "provider" ? "Your fictional profile" : "Sample local results"}</h2>
              </div>
              <span className="product-demo__fictional-label">Fictional demo data</span>
            </div>

            {role === "provider" ? (
              <div className="demo-provider-profile">
                <img src={trailWalk} alt="Dogs on a wooded trail" />
                <div>
                  <span className="demo-provider-profile__status">Accepting new clients</span>
                  <h3>North Star Pet Walks</h3>
                  <p>Minneapolis, Minnesota · 15-mile service area</p>
                  <p>
                    Dog walking, puppy visits, and senior-dog check-ins with
                    flexible weekday availability.
                  </p>
                  <ul>
                    <li>Five years of pet-care experience</li>
                    <li>Dog walking and drop-in visits</li>
                    <li>Direct introductions with local owners</li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="demo-provider-grid">
                {providers.map((provider) => (
                  <article className="demo-provider-card" key={provider.name}>
                    <img src={provider.image} alt="Sample pet-care service" />
                    <div>
                      <span>{provider.availability}</span>
                      <h3>{provider.name}</h3>
                      <p>{provider.service}</p>
                      <p>{provider.location}</p>
                    </div>
                  </article>
                ))}
              </div>
            )}

            <div className="demo-message-card">
              <div className="demo-message-card__header">
                <div>
                  <span>Sample introduction</span>
                  <h3>{role === "provider" ? "New inquiry from Jamie" : "Message North Star Pet Walks"}</h3>
                </div>
                <span>Preview only</span>
              </div>
              <div className="demo-message-card__body">
                <p>
                  Hi! I’m looking for weekday walks for my senior dog near
                  Lake Nokomis. Would you be available for a short meet-and-greet?
                </p>
              </div>
              <div className="demo-message-card__composer">
                <span>Replies are disabled in this portfolio demo.</span>
                <button type="button" disabled>Send introduction</button>
              </div>
            </div>

            <div className="product-demo__next">
              <div>
                <span className="section__tag">Behind the build</span>
                <h2>See the product decisions and technical work.</h2>
              </div>
              <Link to="/case-study" className="btn">Read the Case Study</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default DemoPage;
