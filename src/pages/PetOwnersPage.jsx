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

      <PetOwners />
    </>
  );
}

export default PetOwnersPage;