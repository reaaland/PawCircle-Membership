function Dashboard() {
  return (
    <section id="dashboard">
      <div className="container">
        <h2>Member Dashboard</h2>

        <p>
          Welcome to your PawCircle member dashboard.
        </p>

        <Link to="/providers" className="btn">
          Find Pet Care
        </Link>
      </div>
    </section>
  );
}