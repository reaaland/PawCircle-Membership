import { useState, useEffect } from "react";
import providers from "../data/providers.json";
import MessageModal from "./MessageModal";

function Providers() {
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const statusLabels = {
    accepting: "🟢 Accepting New Clients",
    limited: "🟡 Limited Availability",
    notAccepting: "🔴 Not Accepting New Clients",
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  const filteredProviders = providers.filter((provider) => {
    const search = searchTerm.toLowerCase();

    return (
      provider.name.toLowerCase().includes(search) ||
      provider.city.toLowerCase().includes(search) ||
      provider.service.toLowerCase().includes(search)
    );
  });

  const sortedProviders = [...filteredProviders].sort((a, b) => {
    if (sortOption === "AZ") {
      return a.name.localeCompare(b.name);
    }

    if (sortOption === "ZA") {
      return b.name.localeCompare(a.name);
    }

    if (sortOption === "SERVICE") {
      return a.service.localeCompare(b.service);
    }

    if (sortOption === "CITY") {
      return a.city.localeCompare(b.city);
    }

    return 0;
  });

  return (
    <section id="providers">
      <div className="container">
        <div className="row">
          <div className="providers__top">
            <div>
              <h2>Provider Directory Preview</h2>

              <p className="preview__notice">
                Browse sample <span className="purple">PawCircle</span>{" "}
                provider profiles. Full provider listings will be available to
                members.
              </p>
            </div>

            <div className="providers__controls">
              <input
                type="text"
                className="provider__search"
                placeholder="Search by name, city, or service..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="">Sort providers</option>
                <option value="AZ">Name A-Z</option>
                <option value="ZA">Name Z-A</option>
                <option value="SERVICE">Service A-Z</option>
                <option value="CITY">City A-Z</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="providers">
              {[...Array(6)].map((_, index) => (
                <div
                  className="provider__card provider__card--skeleton"
                  key={index}
                >
                  <div className="skeleton skeleton__img"></div>
                  <div className="skeleton skeleton__title"></div>
                  <div className="skeleton skeleton__text"></div>
                  <div className="skeleton skeleton__text"></div>
                  <div className="skeleton skeleton__button"></div>
                </div>
              ))}
            </div>
          ) : sortedProviders.length > 0 ? (
            <div className="providers">
              {sortedProviders.map((provider) => (
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

                  <p>{provider.experience}</p>

                  {provider.availabilityStatus && (
                    <p className="provider__status">
                      {statusLabels[provider.availabilityStatus]}
                    </p>
                  )}

                  <p>{provider.bio}</p>

                  <button
                    className="provider__contact-btn"
                    onClick={() => setSelectedProvider(provider)}
                  >
                    Contact Provider
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="preview__notice">
              No providers match your search. Try a different name, city, or
              service.
            </p>
          )}

          {selectedProvider && (
            <MessageModal
              provider={selectedProvider}
              onClose={() => setSelectedProvider(null)}
            />
          )}
        </div>
      </div>
    </section>
  );
}

export default Providers;