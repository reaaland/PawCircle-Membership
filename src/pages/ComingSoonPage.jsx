import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/PC_Logo.png";


function ComingSoonPage() {
  const navigate = useNavigate();

  const launchDate = new Date("June 27, 2026 09:00:00").getTime();

  const [timeLeft, setTimeLeft] = useState(launchDate - Date.now());

  useEffect(() => {
    const timer = setInterval(() => {
      const difference = launchDate - Date.now();

      if (difference <= 0) {
        clearInterval(timer);
        navigate("/");
      } else {
        setTimeLeft(difference);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [launchDate, navigate]);

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
  const seconds = Math.floor((timeLeft / 1000) % 60);

  return (
    <section className="coming-soon">
      <div className="container">
        <div className="coming-soon__card">
          <img src={logo} alt="PawCircle logo" className="coming-soon__logo" />

          <h1>
            <span className="purple">PawCircle</span> is almost here
          </h1>

          <p>
            Simple memberships. Direct connections. No commissions or hidden
            fees.
          </p>

          <h2>Launching June 27, 2026</h2>

          <div className="countdown">
            <div>
              <strong>{days}</strong>
              <span>Days</span>
            </div>

            <div>
              <strong>{hours}</strong>
              <span>Hours</span>
            </div>

            <div>
              <strong>{minutes}</strong>
              <span>Minutes</span>
            </div>

            <div>
              <strong>{seconds}</strong>
              <span>Seconds</span>
            </div>
          </div>

          <p className="coming-soon__founder">
            Be one of the first 500 Founder Members and lock in Founder pricing while
            your membership remains active.
          </p>

            <button type="button" className="btn coming-soon__btn">
              Founder Membership Opens June 27
            </button>
        </div>
      </div>
    </section>
  );
}

export default ComingSoonPage;