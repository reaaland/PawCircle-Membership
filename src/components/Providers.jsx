function Providers() {
    return (
<section id="providers">
   <div className="container">
    <div className="row">
  <div className="providers__top">
  <h2>Meet Local Providers</h2>

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
</div>
</div>
  <div className="providers"></div>
</section>
    )
}

export default Providers;
 