import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw } from "@fortawesome/free-solid-svg-icons";


function FounderCard() {
  return (
    <div className="pricing__card founder__card pricing__card--featured">
      <span className="pricing__badge">First 500 Members</span>
      <h3>
        <FontAwesomeIcon icon={faPaw} className="founder-paw" />
        Founder Membership
      </h3>
      <p className="price">$1/month</p>
      <p className="pricing__subtext">Lock in Founder Member pricing for life while your membership stays active.</p>
    </div>
  );
}

function PioneerCard() {
  return (
    <div className="pricing__card pioneer__card">
      <span className="pricing__badge">Next 10,000 Members</span>
      <h3>
        <FontAwesomeIcon icon={faPaw} className="pioneer-paw" />
        Pioneer Membership
      </h3>
      <p className="price">$1/month</p>
      <p className="pricing__subtext">One free month before membership begins.</p>
    </div>
  );
}

function ClientPlan() {
  return (
    <div className="pricing__card regular__card">
      <span className="pricing__badge">Coming Later</span>
      <h3>Pet Owner Membership</h3>
      <p className="price">$1/month</p>
      <p className="pricing__subtext">For members looking for pet services.</p>
    </div>
  );
}

function ProviderPlan() {
  return (
    <div className="pricing__card regular__card">
      <span className="pricing__badge">Coming Later</span>
      <h3>Pet Service Provider Membership</h3>
      <p className="price">$1.50/month</p>
      <p className="pricing__subtext">For members looking to grow their pet business.</p>
    </div>
  );
}

function BothPlan() {
  return (
    <div className="pricing__card regular__card">
      <span className="pricing__badge">Coming Later</span>
      <h3>Owner + Provider Membership</h3>
      <p className="price">$2/month</p>
      <p className="pricing__subtext">For members who want both options.</p>
    </div>
  );
}

function Membership({ featuredOnly, showRegularPlans }) {
  return (
    <section id="membership">
      <div className="container">
        <div className="row">
          <h2>Simple, Transparent Pricing</h2>
          <p className="pricing__intro">
            One simple membership to start. As PawCircle grows, membership options may expand to better support pet owners and pet service providers.
          </p>
          <div className="pricing__wrapper">
            {featuredOnly && (
              <>
                <FounderCard />
                <PioneerCard />
              </>
            )}
            {showRegularPlans && (
              <>
                <ClientPlan />
                <ProviderPlan />
                <BothPlan />
              </>
            )}
          </div>
          
          <p className="pricing__disclaimer">
            * Membership pricing shown before applicable sales tax. Taxes are calculated at checkout based on location.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Membership;
 