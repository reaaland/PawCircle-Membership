import PetOwners from "../components/PetOwners";


function PetOwnersPage() {
  return (
    <>
      <section className="page__hero">
  <div className="container">
    <div className="row">
      <h1>Pet Owner Directory</h1>
    </div>
  </div>
</section>

<PetOwners />
    </>
  );
}

export default PetOwnersPage;