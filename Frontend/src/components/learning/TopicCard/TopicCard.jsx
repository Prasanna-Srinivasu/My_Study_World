import { useNavigate } from "react-router-dom";

import "./TopicCard.css";

function TopicCard({
  topic,
  courseId,
  status = "locked",
}) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (status === "locked") {
      return;
    }

    navigate(`/topic/${courseId}/${topic.id}`);
  };

  const statusLabel =
    status === "completed"
      ? "Completed"
      : status === "current"
        ? "Start Learning"
        : "Locked";

  return (
    <article
      className={`topic-card topic-${status}`}
      onClick={handleClick}
      role={status !== "locked" ? "button" : undefined}
      tabIndex={status !== "locked" ? 0 : -1}
      onKeyDown={(event) => {
        if (
          status !== "locked" &&
          (event.key === "Enter" ||
            event.key === " ")
        ) {
          event.preventDefault();
          handleClick();
        }
      }}
    >
      <div className="topic-card-number">
        {String(topic.number).padStart(2, "0")}
      </div>

      <div className="topic-card-content">
        <span className="topic-card-kicker">
          TOPIC {String(topic.number).padStart(2, "0")}
        </span>

        <h3>{topic.title}</h3>

        <span className="topic-status">
          {status === "completed" && (
            <span className="topic-status-icon">
              ✓
            </span>
          )}

          {status === "locked" && (
            <span className="topic-status-icon">
              •
            </span>
          )}

          {statusLabel}
        </span>
      </div>

      <div
        className="topic-card-arrow"
        aria-hidden="true"
      >
        →
      </div>
    </article>
  );
}

export default TopicCard;