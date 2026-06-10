const [isLoading, setIsLoading] = useState(false);

function handleAction() {
  setIsLoading(true);

  setTimeout(() => {
    setIsLoading(false);
    // do action
  }, 800);
}

{isLoading ? (
  <PawLoader text="Opening Membership Agreement..." />
) : (
  <button
    className="btn"
    onClick={handleContinue}
  >
    Continue
  </button>
)}