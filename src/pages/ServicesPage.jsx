import { Link } from "react-router-dom";
import houseSitting from "../assets/house_sitting.jpg";
import petTaxi from "../assets/Pet_Taxi.jpg";
import sleepyPup from "../assets/Sleepy_pup.jpg";

function ServicesPage() {
  return (
	
    <section id="services-page">
      <div className="container">
		<div className="services__gallery">
		<div className="services__photo-card">
			<img src={houseSitting} alt="Pet Sitting" />
			<span>Pet Sitting</span>
		</div>

		<div className="services__photo-card">
			<img src={petTaxi} alt="Pet Taxi" />
			<span>Pet Taxi</span>
		</div>

		<div className="services__photo-card">
			<img src={sleepyPup} alt="Boarding" />
			<span>Boarding</span>
		</div>
		</div>

        <h2>Find Local Pet Care</h2>

        <p className="services-page__intro">
          Tell caregivers what kind of help you need and when you need it.
          PawCircle helps members connect directly with local pet caregivers.
        </p>

        <div className="request__card">
          <h3>Pet Care Request</h3>

          <form className="request__form">
            <div className="form__group">
              <label>Service Needed</label>
              <select>
                <option>Select a service</option>
                <option>Dog Walking</option>
                <option>Pet Sitting</option>
                <option>Drop-In Visits</option>
                <option>Cat Care</option>
                <option>Pet Taxi</option>
                <option>Boarding</option>
              </select>
            </div>

            <div className="form__row">
              <div className="form__group">
                <label>Full Name</label>
                <input type="text" placeholder="Enter your name" />
              </div>

              <div className="form__group">
                <label>Email</label>
                <input type="email" placeholder="Enter your email" />
              </div>
            </div>

            <div className="form__row">
              <div className="form__group">
                <label>Start Date</label>
                <input type="date" />
              </div>

              <div className="form__group">
                <label>End Date</label>
                <input type="date" />
              </div>
            </div>

            <div className="form__group">
              <label>Details</label>
              <textarea placeholder="Share details about your pet care needs"></textarea>
            </div>

            <button type="submit" className="btn">
              Submit Request
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default ServicesPage;