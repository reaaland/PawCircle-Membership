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
    }, 800);

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
    if (sortOption === "NEAREST") {
      return (a.distanceMiles || 999) - (b.distanceMiles || 999);
    }

    if (sortOption === "AZ") {
      return a.name.localeCompare(b.name);
    }

    if (sortOption === "ZA") {
      return b.name.localeCompare(a.name);
    }

    if (sortOption === "NEWEST") {
      return new Date(b.memberSince) - new Date(a.memberSince);
    }

    if (sortOption === "OLDEST") {
      return new Date(a.memberSince) - new Date(b.memberSince);
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
                Browse sample <span className="purple">PawCircle</span>provider profiles. Full provider
                listings will be available to members.
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
                <option value="NEAREST">Nearest to Me</option>
                <option value="AZ">Name A-Z</option>
                <option value="ZA">Name Z-A</option>
                <option value="NEWEST">Newest members</option>
                <option value="OLDEST">Oldest members</option>
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

                  <span className="profile__type">
                    {provider.profileType}
                  </span>

                  <h3>{provider.name}</h3>

                  <p className="provider__service">{provider.service}</p>

                  <p>
                    {provider.city}, {provider.state}, {provider.country}
                  </p>

                  {provider.distanceMiles && (
                    <p>{provider.distanceMiles} miles away</p>
                  )}

                  <p>{provider.experience}</p>

                  {provider.serviceRadiusMiles && (
                    <p>Service Area: {provider.serviceRadiusMiles} miles</p>
                  )}

                  {provider.availabilityStatus && (
                    <p className="provider__status">
                      {statusLabels[provider.availabilityStatus]}
                    </p>
                  )}

                  <p>
                    {provider.membershipLevel} Member • Since{" "}
                    {new Date(provider.memberSince).toLocaleDateString(
                      "en-US",
                      {
                        month: "long",
                        year: "numeric",
                      }
                    )}
                  </p>

                  <p>{provider.bio}</p>

                  <hr className="provider__divider" />

                  <div className="provider__contact-preferences">
                    <p>
                      <strong>Preferred Communication:</strong>{" "}
                      {provider.preferredCommunication || "PawCircle Messages"}
                    </p>

                    <p>
                      <strong>Contact Info:</strong>{" "}
                      {provider.contactInfo ||
                        "Shared after initial conversation"}
                    </p>
                  </div>

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