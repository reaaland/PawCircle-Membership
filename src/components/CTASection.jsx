import { Link } from "react-router-dom";
import JoinButton from "./JoinButton";


function CTASection() {
  return (
    <section className="cta__section">
      <div className="container">
        <div className="row">
          <div className="cta__wrapper">
            <div className="cta__card">
              <h2>
            Ready to Join <span className="purple">PawCircle Membership</span>?
            </h2>

            <p>
              Become one of our Founder members today.
            </p>

            <JoinButton membershipType="founder">
              Join as a Founder
            </JoinButton>
              
            </div>

            <div className="cta__card">
              <h2>Offer Pet Care?</h2>

                <p>
                  Build another path for local pet owners to find your services—without a PawCircle commission.
                </p>

                <Link to="/for-providers?source=homepage_cta" className="btn">
                  Learn More for Providers
                </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CTASection;
