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
            <span className="purple">PawCircle Membership</span> demonstrates how users could search provider profiles, send an introductory message, and connect directly.
          </p>

          <div className="provider-preview__grid">
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

          <Link to="/demo?role=owner" className="btn">Explore the Owner Demo</Link>
                        
            <p className="provider-preview__disclaimer">
            Provider profiles shown are sample profiles for demonstration purposes and do not represent actual members of PawCircle Membership.
        </p>
        </div>
      </div>
    </section>
  );
}

export default ProviderPreview;
