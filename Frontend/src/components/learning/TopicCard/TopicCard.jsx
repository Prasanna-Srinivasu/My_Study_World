import { useNavigate } from "react-router-dom";
import "./TopicCard.css";

function TopicCard({ topic, courseId, status = "locked" }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (status === "locked") return;

    navigate(`/topic/${courseId}/${topic.id}`);
  };

  return (
    <div
      className={`topic-card topic-${status}`}
      onClick={handleClick}
    >
      <div className="topic-card-number">
        {String(topic.number).padStart(2, "0")}
      </div>

      <div className="topic-card-content">
        <h3>{topic.title}</h3>

        <span className="topic-status">
          {status === "completed"
            ? "✓ Completed"
            : status === "current"
              ? "Start Learning"
              : "🔒 Locked"}
        </span>
      </div>

      <div className="topic-card-arrow">
        →
      </div>
    </div>
  );
}

export default TopicCard;