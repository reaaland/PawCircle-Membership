import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw } from "@fortawesome/free-solid-svg-icons";
import JoinButton from "./JoinButton";
import { founderActive, membershipInfo } from "../config/membershipConfig";

function FounderCard() {
  return (
    <div className="pricing__card founder__card pricing__card--featured">
      <span className="pricing__badge">First 500 Members</span>

      <h3>
        <FontAwesomeIcon icon={faPaw} className="founder-paw" />
        {membershipInfo.founder.name}
      </h3>

      <p className="price">{membershipInfo.founder.price}</p>

      <p className="pricing__subtext">
        {membershipInfo.founder.description}
      </p>

      <JoinButton text="Join as a Founder" membershipType="founder" />
    </div>
  );
}

function OwnerPlan() {
  return (
    <div className="pricing__card regular__card">
      <h3>{membershipInfo.owner.name}</h3>

      <p className="price">{membershipInfo.owner.price}</p>

      <p className="pricing__subtext">
        For members looking for pet services.
      </p>

      <JoinButton text="Join as a Pet Owner" membershipType="owner" />
    </div>
  );
}

function ProviderPlan() {
  return (
    <div className="pricing__card regular__card">
      <h3>{membershipInfo.provider.name}</h3>

      <p className="price">{membershipInfo.provider.price}</p>

      <p className="pricing__subtext">
        For members offering pet services.
      </p>

      <JoinButton text="Join as a Pet Service Provider" membershipType="provider" />
    </div>
  );
}

function BothPlan() {
  return (
    <div className="pricing__card regular__card">
      <h3>{membershipInfo.both.name}</h3>

      <p className="price">{membershipInfo.both.price}</p>

      <p className="pricing__subtext">
        For members who are both pet owners and pet service providers.
      </p>

      <JoinButton
        text="Join as Owner + Provider"
        membershipType="both"
      />
    </div>
  );
}

function Membership() {
  return (
    <section id="membership">
      <div className="container">
        <div className="row">
          <h2>Simple, Transparent Pricing</h2>

          <p className="pricing__intro">
            The first 500 members have the opportunity to join as Founder
            Members and lock in Founder pricing while their membership remains
            active. Once Founder Memberships are filled, standard membership
            options will be available for pet owners, pet service providers, and
            members who are both.
          </p>

          <div className="pricing__wrapper">
            {founderActive && <FounderCard />}

            {!founderActive && (
              <>
                <OwnerPlan />
                <ProviderPlan />
                <BothPlan />
              </>
            )}
          </div>

          <p className="pricing__disclaimer">
            * Membership pricing shown before applicable sales tax. Taxes are
            calculated at checkout based on location.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Membership;