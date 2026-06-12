import { useState } from "react";
import { useNavigate } from "react-router-dom";

function JoinButton({
  text = "Join PawCircle",
  membershipType = "",
}) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  function handleClick() {
    setIsLoading(true);

    setTimeout(() => {
      navigate(`/join?membership=${membershipType}`);
    }, 800);
  }

  return (
    <button
      className="btn"
      onClick={handleClick}
      disabled={isLoading}
    >
      {isLoading ? "🐾 Opening Join Form..." : text}
    </button>
  );
}

export default JoinButton;