import { Link } from "react-router-dom";
import { services } from "../data/services";

function Services() {
  return (
    <section id="services-page">
      <div className="container">
        <div className="row">
          <h1>Pet Care Services</h1>

          <p className="services-page__intro">
            This portfolio demo shows how pet owners could explore service
            categories and discover relevant local provider profiles.
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
                  to="/demo?role=owner"
                  className="btn"
                >
                  Preview This Service
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
