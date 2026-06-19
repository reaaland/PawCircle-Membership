import { Link } from "react-router-dom";
import petTaxi from "../assets/Pet_Taxi.jpg";
import sleepyPup from "../assets/Sleepy_pup.jpg";
import catWindow from "../assets/cat_window.png";
import walkInTheSnow from "../assets/walking in the snow.jpeg";
import hamsterdog from "../assets/hamster_dog_friends.JPG";
import horseDog from "../assets/horse_dog playing.jpg";
import houseSitting from "../assets/house_sitting_fireplace.JPG";
import onTheRun from "../assets/on_the_run.JPG";


function ServicesPage() {
    const services = [
   {
    title: "Dog Walking",
    image: walkInTheSnow,
    imageClass: "services-page__img--walking",
    description:
      "Regular walks, exercise, and companionship tailored to your pet's routine.",
    button: "Find Providers",
    },
    {
      title: "Drop-In Visits",
      image: hamsterdog,
      imageClass: "services-page__img--sitting",
      description:
        "In-home care that allows pets to remain comfortable in familiar surroundings.",
      button: "Find Providers",
    },
    {
      title: "Cat Care",
      image: catWindow,
      imageClass: "services-page__img--cat",
      description:
        "Drop-in visits, feeding, litter maintenance, medication support, and playtime.",
      button: "Find Providers",
    },
    {
      title: "Pet Day Care",
      image: onTheRun,
      imageClass: "services-page__img--daycare",
      description:
      "A safe and engaging day of play, exercise, and companionship while you're away.",
      button: "Find Providers",
    },
    {
      title: "House Sitting",
      image: houseSitting,
      imageClass: "house_sitting_fireplace.JPG",
      description:
        "Overnight care in your home while you're away.",
      button: "Find Providers",
    },
    {
      title: "Boarding",
      image: sleepyPup,
      imageClass: "services-page__img--boarding",
      description:
        "Overnight care provided in a caregiver's home when available.",
      button: "Find Providers",
    },
    {
      title: "Farm & Hobby Farm Care",
      image: horseDog,
      imageClass: "services-page__img--farm",
      description:
        "Care for chickens, ducks, goats, sheep, and other farm animals while you're away.",
      button: "Find Providers",
    },
  ];

  return (
    <section id="services-page">
      <div className="container">
        <div className="row">
          <h1>Pet Care Services</h1>

          <p className="services-page__intro">
            <span className="purple">PawCircle</span> helps pet owners and pet service providers connect
            directly. Explore available services, discover local providers, and
            start the conversation.
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