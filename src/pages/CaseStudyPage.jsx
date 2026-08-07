import { Link } from "react-router-dom";

const capabilities = [
  "Role-based profiles for owners, providers, and people who are both",
  "Location-aware provider discovery and service filtering",
  "Direct introduction messaging with privacy preferences",
  "Responsive account, profile, and directory experiences",
  "Supabase authentication, relational data, policies, and Edge Functions",
  "An original Stripe subscription flow that has since been retired",
];

function CaseStudyPage() {
  return (
    <div className="case-study-page">
      <section className="case-study-page__hero">
        <div className="container">
          <div className="row row__narrow">
            <span className="section__tag">PawCircle LLC case study</span>
            <h1>Designing a direct local connection platform for pet care.</h1>
            <p>
              PawCircle Membership began as a real membership product and
              evolved into a portfolio demonstration of product strategy,
              interface design, frontend engineering, and backend integration.
            </p>
            <div className="hero__actions">
              <Link to="/demo" className="btn">Explore the Product Demo</Link>
              <a href="mailto:hello@pawcirclemembership.com" className="btn btn--secondary">
                Discuss a Website Project
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="case-study-page__section">
        <div className="container">
          <div className="row row__narrow case-study-page__grid">
            <article>
              <span>01</span>
              <h2>The problem</h2>
              <p>
                Independent pet-care providers often rely on large platforms
                that control discovery, communication, and booking economics.
                Pet owners also need a clearer way to discover nearby options.
              </p>
            </article>
            <article>
              <span>02</span>
              <h2>The product response</h2>
              <p>
                PawCircle explored a simpler directory-and-introduction model:
                local profiles, transparent availability, privacy controls, and
                direct communication without managing the service transaction.
              </p>
            </article>
            <article>
              <span>03</span>
              <h2>The business lesson</h2>
              <p>
                A polished platform still needs concentrated supply, demand,
                trust, and distribution. The paid product was responsibly
                closed and refunded; the software now demonstrates the work.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="case-study-page__section case-study-page__section--soft">
        <div className="container">
          <div className="row row__narrow">
            <span className="section__tag">What was built</span>
            <h2>A full-stack product, not just a landing page.</h2>
            <div className="case-study-page__capabilities">
              {capabilities.map((capability) => (
                <div key={capability}>✓ {capability}</div>
              ))}
            </div>

            <div className="case-study-page__stack">
              <div><strong>Frontend</strong><span>React, Vite, responsive CSS</span></div>
              <div><strong>Backend</strong><span>Supabase Postgres, Auth, RLS, Edge Functions</span></div>
              <div><strong>Deployment</strong><span>GitHub workflow and Vercel previews</span></div>
              <div><strong>Current state</strong><span>Public demo with fictional data and no payments</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="case-study-page__cta">
        <div className="container">
          <div className="row row__narrow">
            <h2>Have a service business that needs a clearer website?</h2>
            <p>PawCircle LLC turns business ideas into focused, usable web experiences.</p>
            <a href="mailto:hello@pawcirclemembership.com" className="btn">
              Start a Conversation
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default CaseStudyPage;
