import { useState } from "react";
import { useNavigate } from "react-router-dom";

function JoinButton({
  text = "Explore the PawCircle Demo",
  membershipType = "",
}) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  function handleClick() {
    setIsLoading(true);

    setTimeout(() => {
      navigate(`/demo?role=${membershipType || "owner"}`);
    }, 800);
  }

  return (
    <button
      className="btn"
      onClick={handleClick}
      disabled={isLoading}
    >
      {isLoading ? "🐾 Opening Demo..." : text}
    </button>
  );
}

export default JoinButton;
