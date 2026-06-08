import providers from "../data/providers.json";

function Providers() {
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

          <div className="providers">
            {providers.map((provider) => (
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

                <p className="provider__service">
                  {provider.service}
                </p>

                <p>
                  {provider.city}, {provider.state}, {provider.country}
                </p>

                <p>{provider.experience}</p>

                <p>
                  Service Area: {provider.serviceRadiusMiles} miles
                </p>

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

                <button className="btn">
                  View Profile
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Providers;