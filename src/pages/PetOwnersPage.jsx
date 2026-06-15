function PetOwnersPage() {
  return (
    <>
      <section className="page__hero">
        <div className="container">
          <div className="row">
            <span className="section__tag">Preview Feature</span>

            <h1>
              Future <span className="purple">PawCircle</span> Pet Owner Directory
            </h1>

            <p>
              Preview how <span className="purple">PawCircle</span> members will
              be able to browse local pet owners, learn about their pet care
              needs, and connect directly after launch.
            </p>

            <p className="preview__notice">
              Example profiles shown for demonstration purposes only. These do
              not represent active PawCircle members.
            </p>
          </div>
        </div>
      </section>
    <section className="directory__intro">
  <div className="container">
    <div className="row row__column">
      <h2>Connect With Local Pet Owners</h2>

      <p>
        The Pet Owner Directory will help PawCircle members find pet owners in
        their community who are looking for pet care, animal support, and direct
        local connections.
      </p>

      <div className="directory__cards">
        <div className="directory__card">
          <h3>Find Pet Care Needs</h3>
          <p>
            Browse pet owners by location, pet type, and the kind of care they
            may be looking for.
          </p>
        </div>

        <div className="directory__card">
          <h3>Connect Directly</h3>
          <p>
            Start a PawCircle message and continue the conversation directly if
            both members choose.
          </p>
        </div>

        <div className="directory__card">
          <h3>One Shared Profile</h3>
          <p>
            Members create one profile, and PawCircle displays it in the right
            directory based on their membership/profile type.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>
      <PetOwners />
    </>
  );
}

export default PetOwnersPage;