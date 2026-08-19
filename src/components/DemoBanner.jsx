import { Link } from "react-router-dom";

function DemoBanner() {
  return (
    <div className="demo-banner" role="status">
      <div className="demo-banner__inner">
        <strong>
          <Link to="/demo">Interactive portfolio demo</Link>
        </strong>
        <span>
          Fictional profiles. No active memberships, messages, bookings, or payments.
        </span>
        <Link to="/case-study">View the case study</Link>
      </div>
    </div>
  );
}

export default DemoBanner;