import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

function ActiveMemberRoute({ children }) {
  const [accessState, setAccessState] = useState("loading");

  useEffect(() => {
    let isMounted = true;

    async function checkMembership() {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (!isMounted) return;

      if (userError || !user) {
        setAccessState("signed-out");
        return;
      }

      const normalizedEmail = user.email?.toLowerCase().trim();
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("membership_status")
        .or(`id.eq.${user.id},email.eq.${normalizedEmail}`)
        .maybeSingle();

      if (!isMounted) return;

      if (profileError || profile?.membership_status !== "active") {
        setAccessState("inactive");
        return;
      }

      setAccessState("active");
    }

    checkMembership();

    return () => {
      isMounted = false;
    };
  }, []);

  if (accessState === "loading") {
    return (
      <section className="member-access-loading">
        <div className="container">
          <div className="profile-loading">Checking membership access...</div>
        </div>
      </section>
    );
  }

  if (accessState === "signed-out") {
    return <Navigate to="/join?message=membership-required" replace />;
  }

  if (accessState === "inactive") {
    return <Navigate to="/details?message=membership-inactive" replace />;
  }

  return children;
}

export default ActiveMemberRoute;
