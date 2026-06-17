import { useState, useEffect } from "react";
import { getPetOwners } from "../Services/supabaseService";


function PetOwners() {
  const [petOwners, setPetOwners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPetOwners() {
      const owners = await getPetOwners();

      setPetOwners(owners);
      setLoading(false);
    }

    loadPetOwners();
  }, []);
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

