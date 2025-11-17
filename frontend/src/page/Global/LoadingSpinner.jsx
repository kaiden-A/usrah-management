import "./styles/LoadingSpinner.css";

export default function LoadingSpinner({ text = "Loading...", size = "medium" }) {
  return (
    <div className="loading-container">
      <div className={`spinner ${size}`}></div>
      <p className="loading-text">{text}</p>
    </div>
  );
}
