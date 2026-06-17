import { useEffect, useState } from "react";
import { getProfiles } from "../Services/supabaseService";



function TestSupabase() {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    async function loadProfiles() {
      const data = await getProfiles();
      setProfiles(data);
    }

    loadProfiles();
  }, []);

  return (
    <div>
      <h1>Supabase Test</h1>

      {profiles.map((profile) => (
        <div key={profile.id}>
          <h3>{profile.full_name}</h3>
          <p>{profile.profile_type}</p>
        </div>
      ))}
    </div>
  );
}

export default TestSupabase;