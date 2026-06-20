import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { saveProfile } from "../Services/supabaseService";

function Profile() {
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);

  const serviceOptions = [
    "Dog Walking",
    "Drop-In Visits",
    "Pet Day Care",
    "Overnight Care",
    "House Sitting",
    "Boarding",
    "Cat Care",
    "Pet Taxi",
    "Medication Support",
    "Puppy Care",
    "Senior Pet Care",
    "Small Animal Care",
    "Reptile Care",
    "Bird Care",
    "Farm Animal Care",
    "Hobby Farm Services",
  ];

  const [profile, setProfile] = useState({
    display_name: "",
    username: "",
    city: "",
    state: "",
    zip_code: "",
    service_radius_miles: "",
    profile_type: "pet_owner",
    years_experience: "",
    experience: "",
    bio: "",
    availability: "accepting",
    care_needs: [],
    services_offered: [],
    contact_preferences: [],
    contact_visibility: "after_conversation",
    profile_image: "",
    membership_level: "",
    member_number: "",
    membership_status: "",

  });

  useEffect(() => {
    async function loadProfile() {
      const { data: userData } = await supabase.auth.getUser();
      const user = userData.user;

      if (!user) {
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) {
        return;
      }

      if (data) {
        setProfile((prevProfile) => ({
          ...prevProfile,
          display_name: data.display_name || "",
          username: data.username || "",
          city: data.city || "",
          state: data.state || "",
          zip_code: data.zip_code || "",
          service_radius_miles: data.service_radius_miles
            ? String(data.service_radius_miles)
            : "",
          profile_type: data.profile_type || "pet_owner",
          years_experience: data.years_experience
            ? String(data.years_experience)
            : "",
          experience: data.experience || "",
          bio: data.bio || "",
          availability: data.availability || "accepting",
          care_needs: Array.isArray(data.care_needs)
            ? data.care_needs
            : data.care_needs
            ? JSON.parse(data.care_needs)
            : [],

          services_offered: Array.isArray(data.services_offered)
            ? data.services_offered
            : [],
          contact_preferences: data.contact_preferences || [],
          contact_visibility:data.contact_visibility ||"after_conversation",
          profile_image: data.profile_image || "",
          membership_level: data.membership_level || "",
          member_number: data.member_number || "",
          membership_status: data.membership_status || "",
        }));
      }
    }

    loadProfile();
  }, []);

  function handleServiceChange(field, service) {
    setProfile((prevProfile) => {
      const currentValues = Array.isArray(prevProfile[field])
        ? prevProfile[field]
        : [];

      const alreadySelected = currentValues.includes(service);

      return {
        ...prevProfile,
        [field]: alreadySelected
          ? currentValues.filter((item) => item !== service)
          : [...currentValues, service],
      };
    });
  }

  function handleChange(e) {
    const { id, value } = e.target;

    setProfile((prevProfile) => ({
      ...prevProfile,
      [id]: value,
    }));
  }
  function handleContactPreferenceChange(preference) {
  setProfile((prevProfile) => {
    const alreadySelected =
      prevProfile.contact_preferences.includes(preference);

    return {
      ...prevProfile,
      contact_preferences: alreadySelected
        ? prevProfile.contact_preferences.filter((item) => item !== preference)
        : [...prevProfile.contact_preferences, preference],
    };
  });
}

  async function handlePhotoUpload(e) {
    const file = e.target.files[0];

      if (!file) return;

    const { data: userData } = await supabase.auth.getUser();
    const user = userData.user;

       if (!user) return;

    const filePath = `${user.id}/${Date.now()}-${file.name}`;

    const { error: uploadError } = await supabase.storage
      .from("profile-photos")
      .upload(filePath, file);

        if (uploadError) {
          alert(uploadError.message);
    return;
  }

  const { data } = supabase.storage
    .from("profile-photos")
    .getPublicUrl(filePath);

  setProfile((prevProfile) => ({
    ...prevProfile,
    profile_image: data.publicUrl,
  }));
}

  async function handleSave() {
    setSaving(true);

    const { data: userData } = await supabase.auth.getUser();
    const user = userData.user;

    if (!user) {
      setSaving(false);
      return;
    }

    const profileToSave = {
      id: user.id,
      ...profile,
      service_radius_miles: profile.service_radius_miles
        ? Number(profile.service_radius_miles)
        : null,
      years_experience: profile.years_experience
        ? Number(profile.years_experience)
        : null,
     member_number: profile.member_number
        ? Number(profile.member_number)
        : null,
        };
    
    const { error } = await saveProfile(profileToSave);

    if (error) {
      setSaving(false);
      alert(error.message);
      return;
    }

    setTimeout(() => {
      navigate("/dashboard");
    }, 800);
  }

  return (

    <section id="profile">
      <div className="container">
        <div className="row row__column">
          <div className="page__header">
            <h2>My Profile</h2>

            <Link to="/dashboard" className="page__close">
              ✕
            </Link>
          </div>

          <div className="profile__card">
          <h3>Member Information</h3>

          {profile.membership_level?.toLowerCase() === "founder" && (
            <div className="founder__member">
              🐾 Founder Member
            </div>
          )}

          {profile.member_number && (
            <p className="member__number">
              <strong>Member Number:</strong> #{profile.member_number}
            </p>
          )}

             <div className="form__group">
                <label htmlFor="profile_photo">Profile Photo</label>

                {profile.profile_image && (
                  <img
                    src={profile.profile_image}
                    alt="Profile"
                    className="profile__photo-preview"
                  />
                )}

                <input
                  type="file"
                  id="profile_photo"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                />
              </div>

            <form className="profile__form">
              <div className="form__group">
                <label htmlFor="display_name">Display Name</label>
                <input
                  type="text"
                  id="display_name"
                  value={profile.display_name}
                  onChange={handleChange}
                  placeholder="Your name"
                />
              </div>

             <div className="form__group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  value={profile.username}
                  onChange={handleChange}
                  placeholder="@username"
                />
              </div>

              <div className="form__group">
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  id="city"
                  value={profile.city}
                  onChange={handleChange}
                  placeholder="Your city"
                />
              </div>

              <div className="form__group">
                <label htmlFor="state">State</label>
                <select
                  id="state"
                  value={profile.state}
                  onChange={handleChange}
                >
                  <option value="">Select State</option>
                  <option value="AL">Alabama</option>
                  <option value="AK">Alaska</option>
                  <option value="AZ">Arizona</option>
                  <option value="AR">Arkansas</option>
                  <option value="CA">California</option>
                  <option value="CO">Colorado</option>
                  <option value="CT">Connecticut</option>
                  <option value="DE">Delaware</option>
                  <option value="FL">Florida</option>
                  <option value="GA">Georgia</option>
                  <option value="HI">Hawaii</option>
                  <option value="ID">Idaho</option>
                  <option value="IL">Illinois</option>
                  <option value="IN">Indiana</option>
                  <option value="IA">Iowa</option>
                  <option value="KS">Kansas</option>
                  <option value="KY">Kentucky</option>
                  <option value="LA">Louisiana</option>
                  <option value="ME">Maine</option>
                  <option value="MD">Maryland</option>
                  <option value="MA">Massachusetts</option>
                  <option value="MI">Michigan</option>
                  <option value="MN">Minnesota</option>
                  <option value="MS">Mississippi</option>
                  <option value="MO">Missouri</option>
                  <option value="MT">Montana</option>
                  <option value="NE">Nebraska</option>
                  <option value="NV">Nevada</option>
                  <option value="NH">New Hampshire</option>
                  <option value="NJ">New Jersey</option>
                  <option value="NM">New Mexico</option>
                  <option value="NY">New York</option>
                  <option value="NC">North Carolina</option>
                  <option value="ND">North Dakota</option>
                  <option value="OH">Ohio</option>
                  <option value="OK">Oklahoma</option>
                  <option value="OR">Oregon</option>
                  <option value="PA">Pennsylvania</option>
                  <option value="RI">Rhode Island</option>
                  <option value="SC">South Carolina</option>
                  <option value="SD">South Dakota</option>
                  <option value="TN">Tennessee</option>
                  <option value="TX">Texas</option>
                  <option value="UT">Utah</option>
                  <option value="VT">Vermont</option>
                  <option value="VA">Virginia</option>
                  <option value="WA">Washington</option>
                  <option value="WV">West Virginia</option>
                  <option value="WI">Wisconsin</option>
                  <option value="WY">Wyoming</option>
                </select>
              </div>

              <div className="form__group">
                <label htmlFor="zip_code">ZIP Code</label>
                <input
                  type="text"
                  id="zip_code"
                  value={profile.zip_code}
                  onChange={handleChange}
                  inputMode="numeric"
                  placeholder="ZIP code"
                />
              </div>

              <div className="form__group">
                <label htmlFor="service_radius_miles">Service Area</label>
                <select
                  id="service_radius_miles"
                  value={profile.service_radius_miles}
                  onChange={handleChange}
                >
                  <option value="">Select service area</option>
                  <option value="5">Within 5 miles</option>
                  <option value="10">Within 10 miles</option>
                  <option value="25">Within 25 miles</option>
                  <option value="50">Within 50 miles</option>
                  <option value="100">Within 100+ miles</option>
                </select>
              </div>

              <div className="form__group">
                <label htmlFor="profile_type">Profile Type</label>
                <select
                  id="profile_type"
                  value={profile.profile_type}
                  onChange={handleChange}
                >
                  <option value="pet_owner">Pet Owner</option>
                  <option value="pet_provider">Pet Service Provider</option>
                  <option value="both">Pet Owner + Provider</option>
                </select>
              </div>

              <div className="form__group">
                <label htmlFor="availability">Availability Status</label>
                <select
                  id="availability"
                  value={profile.availability}
                  onChange={handleChange}
                >
                  <option value="accepting">Accepting New Requests</option>
                  <option value="limited">Limited Availability</option>
                  <option value="closed">Not Accepting New Requests</option>
                </select>
              </div>

              <div className="form__group">
                <label>Contact Preferences</label>

                <p className="profile__helper">
                  Choose how you prefer to be contacted and when your contact
                  information should be shared.
                </p>

              <div className="services__checkboxes">
                  {[
                    "PawCircle Messages",
                    "Text Message",
                    "Phone Call",
                    "Email",
                  ].map((preference) => (
                    <label key={preference}>
                      <input
                        type="checkbox"
                        checked={profile.contact_preferences.includes(preference)}
                        onChange={() =>
                          handleContactPreferenceChange(preference)
                        }
                      />
                      {preference}
                    </label>
                  ))}
                </div>

                <div className="contact__visibility">
                  <label htmlFor="contact_visibility">
                    Contact Information Visibility
                  </label>

                  <select
                    id="contact_visibility"
                    value={profile.contact_visibility}
                    onChange={handleChange}
                  >
                    <option value="after_conversation">
                      Share after initial PawCircle conversation
                    </option>
                    <option value="show_on_profile">
                      Show contact information on my profile
                    </option>
                    <option value="pawcircle_only">
                      Only use PawCircle Messages
                    </option>
                  </select>
                </div>
              </div>

    {profile.profile_type === "pet_owner" && (
  <div className="form__group">
    <label>Pet Care Needs</label>

    <p className="profile__helper">
      Select the types of pet care you may be looking for.
    </p>

    <div className="services__checkboxes">
      {serviceOptions.map((service) => (
        <label key={service}>
          <input
            type="checkbox"
            checked={(profile.care_needs || []).includes(service)}
            onChange={() =>
              handleServiceChange("care_needs", service)
            }
          />
          {service}
        </label>
      ))}
    </div>
  </div>
)}

{profile.profile_type === "pet_provider" && (
  <div className="form__group">
    <label>Services Offered</label>

    <p className="profile__helper">
      Select the services you provide.
    </p>

    <div className="services__checkboxes">
      {serviceOptions.map((service) => (
        <label key={service}>
          <input
            type="checkbox"
            checked={(profile.services_offered || []).includes(service)}
            onChange={() =>
              handleServiceChange("services_offered", service)
            }
          />
          {service}
        </label>
      ))}
    </div>
  </div>
)}

{profile.profile_type === "both" && (
  <>
    <div className="form__group">
      <label>Pet Care Needs</label>

      <p className="profile__helper">
        Select the types of pet care you may be looking for.
      </p>

      <div className="services__checkboxes">
        {serviceOptions.map((service) => (
          <label key={service}>
            <input
              type="checkbox"
              checked={(profile.care_needs || []).includes(service)}
              onChange={() =>
                handleServiceChange("care_needs", service)
              }
            />
            {service}
          </label>
        ))}
      </div>
    </div>

    <div className="form__group">
      <label>Services Offered</label>

      <p className="profile__helper">
        Select the services you provide.
      </p>

      <div className="services__checkboxes">
        {serviceOptions.map((service) => (
          <label key={service}>
            <input
              type="checkbox"
              checked={(profile.services_offered || []).includes(service)}
              onChange={() =>
                handleServiceChange("services_offered", service)
              }
            />
            {service}
          </label>
        ))}
      </div>
    </div>
  </>
)}

              <div className="form__group">
                <label htmlFor="years_experience">Years of Experience</label>
                <input
                  type="number"
                  id="years_experience"
                  value={profile.years_experience}
                  onChange={handleChange}
                  min="0"
                  placeholder="0"
                />
              </div>

              <div className="form__group">
                <label htmlFor="experience">Experience</label>
                <textarea
                  id="experience"
                  value={profile.experience}
                  onChange={handleChange}
                  placeholder="Tell members about your experience caring for pets, animals, farm animals, or related services."
                ></textarea>
              </div>

              <div className="form__group">
                <label htmlFor="bio">Bio</label>
                <textarea
                  id="bio"
                  value={profile.bio}
                  onChange={handleChange}
                  placeholder="Introduce yourself to the PawCircle community."
                ></textarea>
              </div>

              <button className="btn" type="button" onClick={handleSave} disabled={saving}>
                {saving ? "🐾 Saving Profile..." : "Save Profile"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Profile;