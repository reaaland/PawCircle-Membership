import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import trailWalk from "../assets/dog walking on trail.jpg";

function Hero() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    async function checkSession() {
      const { data } = await supabase.auth.getSession();
      setIsLoggedIn(!!data.session);
    }

    checkSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setIsLoggedIn(!!session);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

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

              <p className="hero__subtitle">
                Helping pet owners find local pet service providers through simple, direct connections.
              </p>
            </div>

            {!isLoggedIn && (
              <Link to="/join" className="join__btn-fixed">
                Join PawCircle
              </Link>
            )}

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