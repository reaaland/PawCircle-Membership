import { Link } from "react-router-dom";
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
            <h1>Contact PawCircle LLC</h1>

            <p className="contact__intro">
              Interested in a website project, or have a question about the
              PawCircle Membership case study? Send us an email.
            </p>

            <a
              className="contact__email"
              href="mailto:hello@pawcirclemembership.com"
            >
              hello@pawcirclemembership.com
            </a>

            <div className="contact__socials">
              <h3>Former Member Data Requests</h3>

              <p>
                The original paid membership has closed. Former members may
                email from the address connected to their former account with
                the subject “Account Data Request.”
              </p>

              <p className="settings__warning">
                Do not include passwords, payment-card information, or other
                unnecessary sensitive information in an email.
              </p>

              <Link to="/privacy" className="btn">Read the Privacy Policy</Link>
            </div>

            <div className="contact__socials">
              <h3>Follow PawCircle LLC</h3>

              <div className="contact__social-links">
                <a
                  href="https://www.facebook.com/share/1YGw1Ct7aF/?mibextid=wwXIfr"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow PawCircle Membership on Facebook"
                >
                  <FontAwesomeIcon icon={faFacebook} />
                  <span>Facebook</span>
                </a>

                <a
                  href="https://www.instagram.com/pawcircle_membership/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow PawCircle Membership on Instagram"
                >
                  <FontAwesomeIcon icon={faInstagram} />
                  <span>Instagram</span>
                </a>

                <a
                  href="https://bsky.app/profile/pawcirclellc.bsky.social"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow PawCircle Membership on Bluesky"
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
