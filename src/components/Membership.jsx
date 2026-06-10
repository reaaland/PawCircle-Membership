import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw } from "@fortawesome/free-solid-svg-icons";
import JoinButton from "./JoinButton";

function FounderCard() {
  return (
    <div className="pricing__card founder__card pricing__card--featured">
      <span className="pricing__badge">First 500 Members</span>

      <h3>
        <FontAwesomeIcon icon={faPaw} className="founder-paw" />
        Founder Membership
      </h3>

      <p className="price">$10/year</p>

      <p className="pricing__subtext">
        Lock in Founder Member pricing for life while your membership stays
        active.
      </p>

      <JoinButton text="Join as a Founder" membershipType="founder" />
    </div>
  );
}

function ClientPlan() {
  return (
    <div className="pricing__card regular__card">
      <h3>Pet Owner Membership</h3>

      <p className="price">$1.50/month or $15/year</p>

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
      <h3>Pet Service Provider Membership</h3>

      <p className="price">$1.50/month or $15/year</p>

      <p className="pricing__subtext">
        For members looking to grow their pet business.
      </p>

      <JoinButton text="Join as a Provider" membershipType="provider" />
    </div>
  );
}

function BothPlan() {
  return (
    <div className="pricing__card regular__card">
      <h3>Owner + Provider Membership</h3>

      <p className="price">$2/month or $20/year</p>

      <p className="pricing__subtext">
        For members who want both options.
      </p>

      <JoinButton
        text="Join as a Pet Owner + Provider"
        membershipType="both"
      />
    </div>
  );
}

// Founder Membership
// First 500 members
// $10/year
//
// Standard Memberships
// Display automatically when memberCount >= 500
// Pet Owner: $1.50/month or $15/year
// Pet Service Provider: $1.50/month or $15/year
// Owner + Provider: $2/month or $20/year
//
// Stripe Pricing Tables
const stripePricingTables = {
  owner: "prctbl_1TgtKXGgktsetxqRUcLjBLie",
  provider: "prctbl_1TgtMDGgktsetxqREu7vZP8J",
  both: "prctbl_1TgtNzGgktsetxqR7UC17Bfu",
};

function Membership() {
  // Temporary until Supabase is connected
  const memberCount = 325;

  // Future:
  // const memberCount = membershipCount;

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
            {/* Founder Membership */}
            {memberCount < 500 && <FounderCard />}

            {/* Standard Memberships */}
            {memberCount >= 500 && (
              <>
                <ClientPlan />
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