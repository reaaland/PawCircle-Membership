import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

function UpdatePassword() {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    setSaving(true);
    setError("");
    setMessage("");

    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      setError(error.message);
      setSaving(false);
      return;
    }

    setMessage("Your password has been updated.");

    setTimeout(() => {
      navigate("/dashboard");
    }, 1500);
  }

  return (
    <section id="update-password">
      <div className="container">
        <div className="row row__column">

          <div className="login__modal">

            <h2>Choose a New Password</h2>

            <p>
              Enter a new password for your PawCircle Membership account.
            </p>

            <form onSubmit={handleSubmit}>

              <input
                type="password"
                placeholder="New password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              {message && (
                <p className="form__success">{message}</p>
              )}

              {error && (
                <p className="form__error">{error}</p>
              )}

              <button
                className="btn"
                type="submit"
                disabled={saving}
              >
                {saving ? "Updating..." : "Update Password"}
              </button>

            </form>

          </div>

        </div>
      </div>
    </section>
  );
}

export default UpdatePassword;