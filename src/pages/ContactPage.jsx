import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faBluesky,
} from "@fortawesome/free-brands-svg-icons";

function ContactPage() {
  return (
    <section className="contact-page">
      <div className="container">
        <div className="row row__narrow">
          <div className="contact__card">
            <h1>Contact PawCircle</h1>

            <p className="contact__intro">
              Questions about PawCircle? Send us an email.
            </p>

            <a
              className="contact__email"
              href="mailto:hello@pawcirclemembership.com"
            >
              hello@pawcirclemembership.com
            </a>

            <div className="contact__socials">
              <h3>Follow PawCircle</h3>

              <div className="contact__social-links">
                <a
                  href="https://www.facebook.com/share/1YGw1Ct7aF/?mibextid=wwXIfr"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow PawCircle on Facebook"
                >
                  <FontAwesomeIcon icon={faFacebook} />
                  <span>Facebook</span>
                </a>

                <a
                  href="https://www.instagram.com/pawcircle_membership/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow PawCircle on Instagram"
                >
                  <FontAwesomeIcon icon={faInstagram} />
                  <span>Instagram</span>
                </a>

                <a
                  href="https://bsky.app/profile/pawcirclellc.bsky.social"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow PawCircle on Bluesky"
                >
                  <FontAwesomeIcon icon={faBluesky} />
                  <span>Bluesky</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactPage;