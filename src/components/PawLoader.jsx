function PawLoader({ text }) {
  return (
    <div className="loading__container">
      <div className="loading__paw">🐾</div>
      <p>{text}</p>
    </div>
  );
}

export default PawLoader;