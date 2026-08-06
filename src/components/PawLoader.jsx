function PawLoader({ text = "Loading..." }) {
  return (
    <div className="loading__container" role="status" aria-live="polite">
      <div className="loading__paw" aria-hidden="true">
        🐾
      </div>
      <p>{text}</p>
    </div>
  );
}

export default PawLoader;
