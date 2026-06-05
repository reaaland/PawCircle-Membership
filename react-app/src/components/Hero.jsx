import React from "react";
import trailWalk from "../assets/dog walking on trail.jpg";

function Hero() {
  return (
    <section id="header">
      <div className="container">
        <div className="row">
          <div className="header__container">

            <div className="header__description">
              <h1>
                Find Local <span className="purple">Pet Care</span> — Without Booking Fees
              </h1>

              <div className="trust__badges">
                <span>✔ Local pet services</span>
                <span>✔ Direct communication</span>
                <span>✔ No commissions</span>
                <span>✔ No hidden fees</span>
              </div>

              <p>
              Building local pet care connections, one community at a time.
              </p>
            </div>

            <a href="#membership" className="join__btn-fixed">
              Join PawCircle
            </a>

            <figure className="header__img--wrapper">
              <img
                className="header__img"
                src={trailWalk}
                alt="Trail walk with dogs"
              />
            </figure>

          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;

