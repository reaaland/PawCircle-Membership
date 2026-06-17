import { Link } from "react-router-dom";
import dogKitten from "../assets/kitten_dog_toys.png";

function Dashboard() {
  const profileType = "both";

  return (
    <section id="dashboard">
      <div className="container dashboard__container">
        <div className="dashboard__welcome">
          <img
            src={dogKitten}
            alt="Dog and kitten together"
            className="dashboard__welcome--img"
          />

          <div className="dashboard__welcome--content">
            <h2>
              Welcome Back to <span className="purple">PawCircle</span>
            </h2>

            <p className="dashboard__intro">
              Manage your profile, browse member directories, and make direct
              pet care connections.
            </p>
          </div>
        </div>

        <div className="dashboard__cards">
          {(profileType === "pet_owner" || profileType === "both") && (
            <Link to="/providers" className="dashboard__card">
              <h3>Find Pet Care</h3>
              <p>Search pet service provider profiles.</p>
            </Link>
          )}

          {(profileType === "pet_provider" || profileType === "both") && (
            <Link to="/pet-owners" className="dashboard__card">
              <h3>View Pet Owner Profiles</h3>
              <p>Search pet owner profiles.</p>
            </Link>
          )}

          <Link to="/profile" className="dashboard__card">
            <h3>My Profile</h3>
            <p>
              Create and manage your <span className="purple">PawCircle</span>{" "}
              member profile.
            </p>
          </Link>

          <Link to="/messages" className="dashboard__card">
            <h3>Introductions</h3>
            <p>
              View introduction messages from PawCircle members.
            </p>
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