function HowItWorks() {
  return (
    <section className="how-it-works">
      <div className="container">
        <div className="row">
          <h2>How <span className="purple">PawCircle</span> Works</h2>

          <p className="how__intro">
            <span className="purple">PawCircle</span> helps pet owners find local pet care and helps pet service providers showcase their services and build local connections through simple memberships and direct communication.
          </p>

          <div className="how__cards">
            <div className="how__card">
              <h3>1. Join <span className="purple">PawCircle</span></h3>
              <p>
                Choose a membership and create your <span className="purple">PawCircle</span> account.
              </p>
            </div>

            <div className="how__card">
             <h3>Create a Profile</h3>
              <p>
               Pet owners can share their pet care needs. Pet service providers can showcase their services, experience, and availability.
              </p>
          </div>

            <div className="how__card">
              <h3>3. Find Local Pet Care</h3>
              <p>
               Pet owners can browse provider profiles to learn about services, experience, and availability before deciding who to contact.
              </p>
            </div>

            <div className="how__card">
              <h3>4. Connect Directly</h3>
              <p>
               Members can communicate through <span className="purple">PawCircle</span>, make introductions, and decide together when they would like to exchange contact information and continue their connection outside the platform.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;