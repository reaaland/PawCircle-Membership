import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <section id="dashboard">
      <div className="container dashboard__container">
        <h2>
          Welcome to <span className="purple">PawCircle</span>
        </h2>

        <p className="dashboard__intro">
          Manage your membership and find local pet care providers.
        </p>

        <div className="dashboard__cards">
          <Link to="/providers" className="dashboard__card">
            <h3>Find Pet Care</h3>
            <p>Search local providers by name, city, or service.</p>
          </Link>

          <div className="dashboard__card">
            <h3>My Profile</h3>
            <p>Coming soon.</p>
          </div>

          <Link to="/messages" className="dashboard__card">
          <h3>Messages</h3>
          <p>Start conversations with pet owners and providers.</p>
          </Link>

          <div className="dashboard__card">
            <h3>Membership</h3>
            <p>View your PawCircle membership details soon.</p>
          </div>

          <div className="dashboard__card">
            <h3>Account Settings</h3>
            <p>Manage account preferences soon.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;