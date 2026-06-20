import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getProviders } from "../Services/supabaseService";
import MessageModal from "./MessageModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw } from "@fortawesome/free-solid-svg-icons";

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

      const availableProviders = profiles.filter(
        (provider) =>
          provider.availability === "accepting" ||
          provider.availability === "limited"
      );

      setProviders(availableProviders);
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
      provider.state?.toLowerCase().includes(search) ||
      provider.zip_code?.toLowerCase().includes(search) ||
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
          <div className="directory__header">
            <Link to="/dashboard" className="directory__back">
              ← Dashboard
            </Link>
            </div>
          <div className="providers__top">
            <div>
              <h2>Provider Directory</h2>

              <p className="directory__notice">
                Search provider profiles by name, city, state, ZIP, or service.
              </p>
            </div>

            <div className="providers__controls">
              <input
                type="text"
                className="provider__search"
                placeholder="Search by name, city, state, ZIP, or service..."
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

              {provider.membership_level?.toLowerCase() === "founder" && (
               <div className="founder__badge">
                <FontAwesomeIcon icon={faPaw} className="gold-paw" />
                {" "}Founder Member
              </div>
              )}

                    <p className="provider__service">
                    {provider.profile_type === "both"
                      ? "Pet Owner & Service Provider"
                      : "Pet Service Provider"}
                  </p>

                  <p>
                    {provider.city}, {provider.state} {provider.zip_code}
                  </p>

                  {provider.service_radius_miles && (
                    <p>Service area: {provider.service_radius_miles} miles</p>
                  )}

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
              No providers match your search. Try a different name, city, state,
              ZIP, or service.
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