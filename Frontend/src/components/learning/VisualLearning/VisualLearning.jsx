import "./VisualLearning.css";

function VisualLearning({
  topic,
  image,
  title,
  description,
}) {
  const handleImageError = (event) => {
    console.error("Image failed to load:", image);

    event.currentTarget.style.display = "none";
    event.currentTarget.parentElement.classList.add(
      "visual-image-error"
    );
  };

  return (
    <section className="visual-learning">
      <div className="visual-section-heading">
        <div className="visual-section-number">02</div>

        <div>
          <span className="visual-section-label">
            VISUAL LEARNING
          </span>

          <h2>See the Concept Clearly</h2>

          <p>
            Understand {topic} through a visual
            explanation.
          </p>
        </div>
      </div>

      <div className="visual-learning-card">
        <div className="visual-learning-image-wrap">
          <div className="visual-learning-image">
            {image ? (
              <img
                src={image}
                alt={`${topic} visual explanation`}
                onError={handleImageError}
              />
            ) : null}

            <div className="visual-placeholder">
              <span>◇</span>
              <strong>Visual coming soon</strong>
              <p>
                An educational visual for this topic
                will appear here.
              </p>
            </div>
          </div>

          <div className="visual-image-caption">
            <span>VISUAL GUIDE</span>
            <span>{topic}</span>
          </div>
        </div>

        <div className="visual-learning-content">
          <span className="visual-content-label">
            CONCEPT MAP
          </span>

          <h3>{title || topic}</h3>

          <p>
            {description ||
              `Explore ${topic} visually to understand the
              key ideas and how they connect.`}
          </p>

          <div className="visual-learning-note">
            <span className="visual-note-mark">✦</span>

            <div>
              <strong>Learn visually</strong>
              <p>
                Use the visual explanation together with
                the lesson and code example for a clearer
                understanding.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default VisualLearning;