import { useState, useEffect } from "react";
import { getProviders } from "../Services/supabaseService";
import MessageModal from "./MessageModal";

function Providers() {
  const [providers, setProviders] = useState([]);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [openingProviderId, setOpeningProviderId] = useState(null);

  useEffect(() => {
    async function loadProviders() {
      const profiles = await getProviders();

      setProviders(profiles); =>
          profile.profile_type === "pet_provider" ||
          profile.profile_type === "both"
      );

      setProviders(providerProfiles);
      setLoading(false);
    }

    loadProviders();
  }, []);

  function handleContactProvider(provider) {
    setOpeningProviderId(provider.id);

    setTimeout(() => {
      setSelectedProvider(provider);
      setOpeningProviderId(null);
    }, 800);
  }

  const filteredProviders = providers.filter((provider) => {
    const search = searchTerm.toLowerCase();

    return (
      provider.full_name?.toLowerCase().includes(search) ||
      provider.city?.toLowerCase().includes(search) ||
      provider.bio?.toLowerCase().includes(search)
    );
  });

  const sortedProviders = [...filteredProviders].sort((a, b) => {
    if (sortOption === "AZ") {
      return a.full_name.localeCompare(b.full_name);
    }

    if (sortOption === "ZA") {
      return b.full_name.localeCompare(a.full_name);
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
              <h2>Provider Directory</h2>

              <p className="directory__notice">
                Search provider profiles by name, city, or service.
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
                  <h3>{provider.full_name}</h3>

                  <p className="provider__service">
                    {provider.profile_type === "both"
                      ? "Pet Owner & Service Provider"
                      : "Pet Service Provider"}
                  </p>

                  <p>
                    {provider.city}, {provider.state}
                  </p>

                  <p>{provider.bio}</p>

                  <button
                    className="provider__contact-btn"
                    onClick={() => handleContactProvider(provider)}
                    disabled={openingProviderId === provider.id}
                  >
                    {openingProviderId === provider.id
                      ? "🐾 Opening Message..."
                      : "Contact Provider"}
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="directory__notice">
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