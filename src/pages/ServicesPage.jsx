import { Link } from "react-router-dom";
import houseSitting from "../assets/house_sitting.jpg";
import petTaxi from "../assets/Pet_Taxi.jpg";
import sleepyPup from "../assets/Sleepy_pup.jpg";
import catWindow from "../assets/cat_window.png";
import riverwalk from "../assets/fun by the river.jpg";
import hamsterdog from "../assets/hamster_dog_friends.JPG";
import horseDog from "../assets/horse_dog playing.jpg";

function ServicesPage() {
  const services = [
    {
      title: "Dog Walking",
      image: riverwalk,
      description:
        "Regular walks, exercise, and companionship tailored to your pet's routine.",
      button: "Find Providers",
    },
    {
      title: "Pet Sitting",
      image: hamsterdog,
      description:
        "In-home care that allows pets to remain comfortable in familiar surroundings.",
      button: "Find Providers",
    },
    {
      title: "Cat Care",
      image: catWindow,
      description:
        "Drop-in visits, feeding, litter maintenance, medication support, and playtime.",
      button: "Find Providers",
    },
    {
      title: "Pet Taxi",
      image: petTaxi,
      description:
        "Transportation for veterinary appointments, grooming visits, daycare, and more.",
      button: "Find Providers",
    },
    {
      title: "Boarding",
      image: sleepyPup,
      description:
        "Overnight care provided in a caregiver's home when available.",
      button: "Find Providers",
    },
    {
      title: "Farm & Hobby Farm Care",
      image: horseDog,
      description:
        "Care for chickens, ducks, goats, sheep, and other farm animals while you're away. Services vary based on each provider's experience and comfort level.",
      button: "Find Providers",
    },
  ];

  return (
    <section id="services-page">
      <div className="container">
        <div className="row">
          <h1>Pet Care Services</h1>

          <p className="services-page__intro">
            PawCircle helps pet owners and pet service providers connect
            directly. Explore available services, discover local providers, and
            start the conversation.
          </p>

          <div className="services-page__grid">
            {services.map((service) => (
              <div className="services-page__card" key={service.title}>
                <img
                  src={service.image}
                  alt={service.title}
                  className="services-page__img"
                />

                <h2>{service.title}</h2>
                <p>{service.description}</p>

                <Link to="/providers" className="btn">
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

export default ServicesPage;