import { Link } from "react-router-dom";
import servicesImg from "../assets/walking in the snow.jpeg";

function Services() {
  return (
    <section id="services">
      <div className="container services__preview">
        <div>
          <h2>Pet Care Services in Your Community</h2>

          <p>
            PawCircle helps members connect directly with local pet caregivers
            for everyday care needs.
          </p>

          <div className="services__list">
            <span>Dog Walking</span>
            <span>Pet Sitting</span>
            <span>Drop-In Visits</span>
            <span>Cat Care</span>
            <span>Pet Taxi</span>
            <span>Boarding</span>
          </div>

          <Link to="/services" className="btn">
            View Services
          </Link>
        </div>

        <img src={servicesImg} alt="walking in the snow.jpeg" />
      </div>
    </section>
  );
}

export default Services;