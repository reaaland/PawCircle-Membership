function MembershipDetails() {
  return (
    <section id="membership-details">
      <div className="container">
        <div className="row row__column">
          <h2>Membership Details</h2>

          <div className="membership-details__card">
            <h3>Founder Membership</h3>

            <p>
              Founder Members lock in Founder pricing while their membership
              remains active.
            </p>

            <ul>
              <li>$10 annual membership</li>
              <li>Direct access to the PawCircle community</li>
              <li>Connect directly with pet owners and pet service providers</li>
              <li>No booking commissions</li>
              <li>No hidden fees</li>
            </ul>

            <p>
              Your membership details help you keep track of your PawCircle
              membership type, benefits, and account information.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MembershipDetails;