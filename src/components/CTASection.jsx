import { Link } from "react-router-dom";

function CTASection() {
  return (
    <section className="cta__section">
      <div className="container">
        <div className="row">
          <div className="cta__wrapper">
            <div className="cta__card">
              <h2>
                Explore the <span className="purple">PawCircle Product Demo</span>
              </h2>

              <p>
                Switch between pet-owner and provider perspectives using fictional data.
              </p>

              <Link to="/demo" className="btn">Explore the Demo</Link>
            </div>

            <div className="cta__card">
              <h2>See the Provider Experience</h2>

              <p>
                Explore how the original product was designed to help independent
                pet-care providers present their services and connect directly
                with local pet owners.
              </p>

              <Link to="/for-providers?source=homepage_cta" className="btn">
                View the Provider Concept
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CTASection;
