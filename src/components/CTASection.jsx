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
            Ready to Join <span className="purple">PawCircle</span>?
            </h2>

            <p>
              Become one of our Founder members today.
            </p>

            <JoinButton membershipType="founder">
              Join as a Founder
            </JoinButton>
              
            </div>

            <div className="cta__card">
              <h2>Need Pet Care?</h2>

                <p>
                  Find pet service providers in your community and connect directly.
                </p>

                <Link to="/providers" className="btn">
                  Browse Providers
                </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CTASection;