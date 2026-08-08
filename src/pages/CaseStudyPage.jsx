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
            <h1>Taking a local pet-care platform from idea to launch.</h1>
            <p>
              PawCircle Membership was a real paid product I designed, built,
              launched, and supported. It is now preserved as an interactive
              portfolio demo showing the product decisions and full-stack work
              behind it.
            </p>
            <div className="hero__actions">
              <Link to="/demo" className="btn">Explore the Product Demo</Link>
              <a href="mailto:pawcirclellc@gmail.com" className="btn btn--secondary">
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
                The idea came from wanting a simpler way for pet owners and
                independent pet-care providers to find one another locally and
                communicate directly without PawCircle controlling the service
                transaction.
              </p>
            </article>
            <article>
              <span>02</span>
              <h2>What I built</h2>
              <p>
                I turned that idea into a working membership product with
                role-based profiles, local discovery, privacy preferences,
                direct messaging, authentication, payments, and responsive
                owner and provider experiences.
              </p>
            </article>
            <article>
              <span>03</span>
              <h2>Outcome &amp; what I learned</h2>
              <p>
                After launch, I found several free platforms already offered
                much of the same core value. That made it difficult to justify
                charging for PawCircle without stronger differentiation, so I
                closed the paid membership, refunded the members, and kept the
                application as a portfolio project.
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
              <div><strong>Current state</strong><span>Interactive public demo with fictional data and no payments</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="case-study-page__cta">
        <div className="container">
          <div className="row row__narrow">
            <h2>Have a service business that needs a clearer website?</h2>
            <p>
              I bring the same practical approach to website projects: understand
              the real need, build a clear solution, and keep improving it as
              the evidence changes.
            </p>
            <a href="mailto:pawcirclellc@gmail.com" className="btn">
              Start a Conversation
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default CaseStudyPage;
