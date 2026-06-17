import Providers from "../components/Providers";

function ProvidersPage() {
  return (
    <>
      <section className="page__hero">
        <div className="container">
          <div className="row">
            <span className="section__tag">Provider </span>

            <h1><span className="purple">PawCircle</span> Provider Directory</h1>

            <p>
              Preview how <span className="purple">PawCircle</span> members will be able to browse local pet
              caregivers, compare services, and connect directly after launch.
            </p>

            <p className="preview__notice">
              Example profiles shown for demonstration purposes only. These do
              not represent active PawCircle members.
            </p>
          </div>
        </div>
      </section>

      <Providers />
    </>
  );
}

export default ProvidersPage;