import { Link } from "react-router-dom";

const demoRoles = [
  {
    key: "owner",
    icon: "🐕",
    title: "Pet Owner View",
    description:
      "Preview service discovery, local provider profiles, care needs, and a sample introduction.",
  },
  {
    key: "provider",
    icon: "🦮",
    title: "Provider View",
    description:
      "Preview a service profile, availability, service area, and an example client inquiry.",
  },
  {
    key: "both",
    icon: "🐾",
    title: "Owner + Provider View",
    description:
      "See how one account could move between finding care and offering local services.",
  },
];

function Membership() {
  return (
    <section id="membership">
      <div className="container">
        <div className="row row__column">
          <span className="section__tag">Product concept</span>
          <h2>Choose a PawCircle demo perspective</h2>
          <p className="pricing__intro">
            PawCircle Membership is now presented as a portfolio demonstration.
            These views use fictional information and do not create accounts,
            memberships, bookings, or payments.
          </p>

          <div className="pricing__wrapper demo-role-grid">
            {demoRoles.map((role) => (
              <article className="pricing__card demo-role-card" key={role.key}>
                <span className="demo-role-card__icon" aria-hidden="true">
                  {role.icon}
                </span>
                <h3>{role.title}</h3>
                <p className="pricing__subtext">{role.description}</p>
                <Link to={`/demo?role=${role.key}`} className="btn">
                  Preview {role.title}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Membership;
