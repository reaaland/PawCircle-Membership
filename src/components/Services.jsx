import { Link } from "react-router-dom";
import { services } from "../data/services";

function Services({ isLoggedIn = false }) {
  return (
    <section id="services-page">
      <div className="container">
        <div className="row">
          <h1>Pet Care Services</h1>

          <p className="services-page__intro">
            <span className="purple">PawCircle</span> helps pet owners and pet
            service providers connect directly. Explore available services,
            discover local providers, and start the conversation.
          </p>

          <div className="services-page__grid">
            {services.map((service) => (
              <div className="services-page__card" key={service.title}>
                <img
                  src={service.image}
                  alt={service.title}
                  className={`services-page__img ${service.imageClass}`}
                />

                <h2>{service.title}</h2>
                <p>{service.description}</p>

                <Link
                  to={isLoggedIn ? "/providers" : "/join"}
                  className="btn"
                >
                  {service.button}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Services;