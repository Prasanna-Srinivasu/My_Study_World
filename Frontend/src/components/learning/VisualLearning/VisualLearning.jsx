import "./VisualLearning.css";

function VisualLearning({ topic, image, title, description }) {
  const handleImageError = (event) => {
    console.error("Image failed to load:", image);
    event.currentTarget.style.display = "none";
    event.currentTarget.parentElement.classList.add("image-error");
  };

  return (
    <section className="visual-learning">
      <div className="section-title">
        <span>02</span>

        <div>
          <h2>Visual Learning</h2>
          <p>Understand {topic} with a visual explanation.</p>
        </div>
      </div>

      <div className="visual-learning-card surface-3d">
        <div className="visual-learning-image">
          {image ? (
            <img
              src={image}
              alt={`${topic} visual`}
              onError={handleImageError}
            />
          ) : null}

          <div className="visual-placeholder">
            <span>🧩</span>
            <p>Visual coming soon</p>
          </div>
        </div>

        <div className="visual-learning-content">
          <span className="visual-label">
            VISUAL EXPLANATION
          </span>

          <h3>{title || topic}</h3>

          <p>
            {description ||
              `Explore ${topic} visually to understand the concept more easily.`}
          </p>
        </div>
      </div>
    </section>
  );
}

export default VisualLearning;