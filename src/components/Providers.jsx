import { useState, useEffect } from "react";
import providers from "../data/providers.json";
import MessageModal from "./MessageModal";

function Providers() {
 const [selectedProvider, setSelectedProvider] = useState(null);
 const [loading, setLoading] = useState(true);

 useEffect(() => {
  const timer = setTimeout(() => {
    setLoading(false);
  }, 1000);

  return () => clearTimeout(timer);
}, []);

  return (
    <section id="providers">
      <div className="container">
        <div className="row">
          <div className="providers__top">
            <h2>Provider Directory Preview</h2>

            <div className="providers__controls">
              <input
                type="text"
                className="provider__search"
                placeholder="Search by name, city, or service..."
              />

              <select>
                <option value="">Sort providers</option>
                <option value="AZ">Name A-Z</option>
                <option value="ZA">Name Z-A</option>
                <option value="MOST_BOOKINGS">Most bookings</option>
                <option value="LOW_TO_HIGH">Price: Low to High</option>
                <option value="HIGH_TO_LOW">Price: High to Low</option>
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
) : (
  <div className="providers">
    {providers.map((provider) => (
      <div className="provider__card" key={provider.id || provider.name}>
        <div className="provider__img">{/* image placeholder */}</div>
        <h3 className="provider__name">{provider.name}</h3>
        <p className="provider__city">{provider.city}</p>
        <p className="provider__services">{(provider.services || []).join(", ")}</p>
        <button
          className="provider__contact"
          onClick={() => setSelectedProvider(provider)}
        >
          Message
        </button>
      </div>
    ))}
  </div>
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