function Membership() {
    return (
<section id="membership">
  <div className="container">
    <div className="row">

  <h2>Simple, Transparent Pricing</h2>

  <p className="pricing__intro">
    One simple membership to start. As PawCircle grows, membership options may expand to better support pet owners and pet service providers. 
  </p>

  <div className="pricing__wrapper">

  <div className="pricing__card founder__card pricing__card--featured">
    <span className="pricing__badge">First 500 Members</span>
    <span className="founder-paw">
      <i className="fa-solid fa-paw"></i>
    </span>
    <p className="price">$1/month</p>
    <p className="pricing__subtext">Lock in Founder Member pricing for life while your membership stays active.</p>
  </div>

  <div className="pricing__card  pioneer__card">
    <span className="pricing__badge">Next 1000 Members</span>
    <span className="pioneer-paw">
      <i className="fa-solid fa-paw"></i>
    </span>
    <p className="price">$1/month</p>
    <p className="pricing__subtext">One free month before membership begins.</p>
  </div>

  <div className="pricing__card regular__card">
  <span className="pricing__badge">Coming Later</span>
    <h3>Pet Owner Membership</h3>
    <p className="price">$1/month</p>
    <p className="pricing__subtext">For members looking for pet services.</p>
  </div>

   <div className="pricing__card regular__card">
    <span className="pricing__badge">Coming Later</span>
    <h3>Pet Service Provider Membership</h3>
    <p className="price">$1.50/month</p>
    <p className="pricing__subtext">For members looking to grow their pet business.</p>
  </div>

   <div className="pricing__card regular__card">
    <span className="pricing__badge">Coming Later</span>
    <h3>Owner + Provider Membership</h3>
    <p className="price">$2/month</p>
    <p className="pricing__subtext">For members who want both options.</p>
  </div>

</div>
      <p className="pricing__disclaimer">
  * Membership pricing shown before applicable sales tax. Taxes are calculated at checkout based on location.
</p>
  </div>
  </div>
</section>
    )
}

export default Membership;
 