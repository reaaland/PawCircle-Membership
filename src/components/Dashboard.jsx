import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import dogKitten from "../assets/kitten_dog_toys.png";
import { supabase } from "../lib/supabase";

function Dashboard() {
  const navigate = useNavigate();
  const [accessAllowed, setAccessAllowed] = useState(false);
  const [profileType, setProfileType] = useState(null);

  useEffect(() => {
    async function loadDashboard() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        navigate("/");
        return;
      }

      const { data: profile, error } = await supabase
        .from("profiles")
        .select("membership_status, profile_type")
        .eq("id", user.id)
        .single();

      if (error || profile?.membership_status !== "active") {
        navigate("/membership");
        return;
      }

      setProfileType(profile.profile_type);
      setAccessAllowed(true);
    }

    loadDashboard();
  }, [navigate]);

 if (!accessAllowed) {
    return (
      <section id="dashboard">
        <div className="container">
          <div className="row row__column">
            <div className="profile-loading">Loading dashboard...</div>
          </div>
        </div>
      </section>
    );
  }

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

          <Link to="/profile" className="dashboard__card">
            <h3>My Profile</h3>
            <p>
              Create and manage your <span className="purple">PawCircle</span>{" "}
              member profile.
            </p>
          </Link>

          <Link to="/messages" className="dashboard__card">
            <h3>Message Center</h3>
            <p>View incoming messages.</p>
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