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
            <h1>Contact PawCircle Membership</h1>

            <p className="contact__intro">
              Questions about PawCircle Membership? Send us an email.
            </p>

            <a
              className="contact__email"
              href="mailto:hello@pawcirclemembership.com"
            >
              hello@pawcirclemembership.com
            </a>

            <div className="contact__socials">
              <h3>Privacy and Account Deletion</h3>

              <p>
                Signed-in members can submit a verified account and data
                deletion request from Account Settings.
              </p>

              <Link to="/account" className="btn">
                Open Account Settings
              </Link>

              <p>
                If you cannot sign in, email us from your account email with
                the subject “Account Deletion Request.” Do not send your
                password or complete payment-card information.
              </p>

              <p className="settings__warning">
                Account deletion does not create a refund. Membership fees
                already paid remain non-refundable.
              </p>
            </div>

            <div className="contact__socials">
              <h3>Follow PawCircle Membership</h3>

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
