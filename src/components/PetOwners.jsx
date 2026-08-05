import { useState, useEffect } from "react";
import { getPetOwners } from "../Services/supabaseService";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

function PetOwners() {
  const navigate = useNavigate();
  const [petOwners, setPetOwners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [accessAllowed, setAccessAllowed] = useState(false);

  useEffect(() => {
    async function loadPetOwners() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        navigate("/");
        return;
      }

      const { data: profile, error } = await supabase
        .from("profiles")
        .select("membership_status")
        .or(`id.eq.${user.id},email.eq.${user.email?.toLowerCase().trim()}`)
        .single();

      if (error || profile?.membership_status !== "active") {
        navigate("/membership");
        return;
      }
      
      setAccessAllowed(true);

      const owners = await getPetOwners();

      setPetOwners(owners);
      setLoading(false);
    }

    loadPetOwners();
  }, [navigate]);
  
    if (!accessAllowed) {
    return (
      <section id="pet-owners">
        <div className="container">
          <div className="row row__column">
            <div className="profile-loading">Checking membership...</div>
          </div>
        </div>
      </section>
    );
  }
    return (
    <section id="pet-owners">
      <div className="container">
        <div className="row">
          {loading ? (
            <p>Loading...</p>
          ) : petOwners.length > 0 ? (
            <div className="providers">
              {petOwners.map((owner) => (
                <div className="provider__card" key={owner.id}>
                  <h3>{owner.full_name}</h3>

                  <p className="provider__service">
                    {owner.profile_type === "both"
                      ? "Pet Owner & Service Provider"
                      : "Pet Owner"}
                  </p>

                  <p>
                    {owner.city}, {owner.state}
                  </p>

                  <p>{owner.bio}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="directory__notice">No pet owner profiles found.</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default PetOwners;

