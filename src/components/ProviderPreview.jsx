import { Link } from "react-router-dom";
import providers from "../data/providers.json";

function ProviderPreview() {
  const previewProviders = providers.slice(0, 3);

  return (
    <section id="provider-preview">
      <div className="container">
        <div className="row row__column">
          <h2>
            Meet Local <span className="purple">Pet Care Providers</span>
          </h2>

          <p className="directory__notice">
            PawCircle members can search provider profiles, connect directly,
            and start conversations without booking fees or commissions.
          </p>

          <div className="providers provider-preview__grid">
            {previewProviders.map((provider) => (
              <div className="provider__card" key={provider.id}>
                <img
                  src={provider.image}
                  alt={provider.name}
                  className="provider__img"
                />

                <h3>{provider.name}</h3>

                <p className="provider__service">{provider.service}</p>

                <p>
                  {provider.city}, {provider.state}
                </p>
              </div>
            ))}
        </div>

        <p className="provider-preview__disclaimer">
            Provider profiles shown are sample profiles for demonstration purposes and do not represent actual PawCircle members.
        </p>

          <Link to="/membership" className="btn">
            Join PawCircle to Access the Directory
          </Link>
        </div>
      </div>
    </section>
  );
}

export default ProviderPreview;