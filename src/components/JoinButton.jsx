import { Link } from "react-router-dom";

function JoinButton({
  text = "Join PawCircle",
  membershipType = "",
  
}) {
  return (
    <Link
      to={`/join?membership=${membershipType}`}
      className="btn"
    >
      {text}
    </Link>
  );
}

export default JoinButton;