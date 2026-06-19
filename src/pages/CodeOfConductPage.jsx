function CodeOfConductPage() {
  return (
    <section className="legal-page">
      <div className="container">
        <div className="row row__narrow">
          <h1>Code of Conduct</h1>

          <p className="legal__date">
            Effective Date: June 27, 2026
          </p>

          <p className="legal__intro">
            PawCircle is committed to creating a respectful membership
            community.
          </p>

          <h2>Members agree to:</h2>

          <ul className="legal__list">
            <li>Provide truthful information</li>
            <li>Treat other members respectfully</li>
            <li>Communicate honestly and professionally</li>
            <li>Comply with applicable laws</li>
            <li>Respect the safety and welfare of pets</li>
          </ul>

          <h2>Members may not:</h2>

          <ul className="legal__list">
            <li>Impersonate another person</li>
            <li>Provide false or misleading information</li>
            <li>Harass, threaten, or abuse others</li>
            <li>Engage in fraudulent or illegal activity</li>
            <li>Use PawCircle for spam or unauthorized advertising</li>
          </ul>

          <p>
            PawCircle reserves the right to suspend or terminate memberships
            that violate this Code of Conduct.
          </p>
        </div>
      </div>
    </section>
  );
}

export default CodeOfConductPage;