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
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactPage;