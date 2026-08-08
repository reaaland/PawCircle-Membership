import { Link } from "react-router-dom";
import trailWalk from "../assets/dog-walking-trail.webp";

function Hero() {
  return (
    <section id="header">
      <div className="container">
        <div className="row">
          <div className="header__container">
            <div className="header__description">
              <h1>
                From Idea to Launch: A <span className="purple">Local Pet-Care Platform</span>
              </h1>

              <div className="trust__badges">
                <span>✔ Role-based profiles</span>
                <span>✔ Direct messaging</span>
                <span>✔ Supabase + Stripe</span>
                <span>✔ Responsive full-stack app</span>
              </div>

              <p className="hero__subtitle">
                PawCircle Membership began as a real paid product for pet owners
                and independent pet service providers. It is now an interactive
                portfolio demo showing the product, design, and full-stack
                development behind it.
              </p>

              <div className="hero__actions">
                <Link to="/demo" className="btn">Explore the Demo</Link>
                <Link to="/case-study" className="btn btn--secondary">Read the Case Study</Link>
              </div>
            </div>

            <figure className="header__img--wrapper">
              <img
                className="header__img"
                src={trailWalk}
                alt="Trail walk with dogs"
              />
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
