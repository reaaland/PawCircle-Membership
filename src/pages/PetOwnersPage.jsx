import { Link } from "react-router-dom";
import PetOwners from "../components/PetOwners";

function PetOwnersPage() {
  return (
    <>
      <section className="page__hero">
        <div className="container">
          <div className="row">

            <div className="directory__header">
              <Link to="/dashboard" className="directory__back">
                ← Dashboard
              </Link>

              <h1>Pet Owner Directory</h1>
            </div>

          </div>
        </div>
      </section>

      <PetOwners />
    </>
  );
}

export default PetOwnersPage;