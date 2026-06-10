import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <section id="dashboard">
      <div className="container dashboard__container">
        <h2>
          Welcome to <span className="purple">PawCircle</span>
        </h2>

        <p className="dashboard__intro">
          Find pet care, connect with members, and manage your PawCircle account.
        </p>

        <div className="dashboard__cards">
          <Link to="/providers" className="dashboard__card">
            <h3>Find Pet Care</h3>
            <p>Search local providers by name, city, or service.</p>
          </Link>

          <Link to="/profile" className="dashboard__card">
            <h3>My Profile</h3>
            <p>Create and manage your PawCircle member profile.</p>
          </Link>

          <Link to="/messages" className="dashboard__card">
            <h3>Messages</h3>
            <p>Start conversations with pet owners and pet service providers.</p>
          </Link>

          <Link to="/details" className="dashboard__card">
            <h3>Membership</h3>
            <p>View your membership type, status, and renewal details.</p>
          </Link>

          <Link to="/account" className="dashboard__card">
            <h3>Account Settings</h3>
            <p>Manage notification, privacy, and account preferences.</p>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;