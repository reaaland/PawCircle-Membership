import { Link } from "react-router-dom";

const roles = [
  {
    key: "owner",
    title: "I need pet care",
    text: "Explore the fictional pet-owner search and introduction experience.",
  },
  {
    key: "provider",
    title: "I offer pet care",
    text: "Explore the fictional provider profile and inquiry experience.",
  },
  {
    key: "both",
    title: "I would do both",
    text: "Preview how both perspectives could live under one account.",
  },
];

function Join() {
  return (
    <section id="join" className="demo-entry-page">
      <div className="container">
        <div className="row row__column">
          <span className="section__tag">No signup required</span>
          <h1>Choose how you want to explore PawCircle</h1>
          <p className="demo-entry-page__intro">
            The original paid membership has closed. This public version lets
            you explore how PawCircle worked using fictional data.
          </p>

          <div className="demo-role-grid">
            {roles.map((role) => (
              <article className="demo-role-card" key={role.key}>
                <h2>{role.title}</h2>
                <p>{role.text}</p>
                <Link to={`/demo?role=${role.key}`} className="btn">
                  Enter This Demo
                </Link>
              </article>
            ))}
          </div>

          <p className="demo-entry-page__note">
            No real providers are listed, no messages are sent, and no payment
            information is requested.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Join;
