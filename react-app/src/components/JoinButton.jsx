import { Link } from "react-router-dom";

function JoinButton({ text = "Join PawCircle" }) {
  return (
    <Link to="/join" className="btn">
      {text}
    </Link>
  );
}

export default JoinButton;