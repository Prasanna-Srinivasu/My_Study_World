import TopicCard from "../TopicCard/TopicCard";
import "./LearningMap.css";

function LearningMap({ topics = [] }) {
  const getCompletedTopics = () => {
    try {
      const savedProgress = JSON.parse(
        localStorage.getItem("studyProgress") || "{}"
      );

      return savedProgress[topics[0]?.courseId] || [];
    } catch (error) {
      console.error("Failed to read study progress:", error);
      return [];
    }
  };

  const completedTopics = getCompletedTopics();

  if (topics.length === 0) {
    return null;
  }

  return (
    <div className="learning-map">
      <div className="learning-map-intro">
        <span className="learning-map-label">
          STEP BY STEP
        </span>

        <p>
          Complete each topic to continue along your
          learning path.
        </p>
      </div>

      <div className="learning-map-path">
        {topics.map((topic, index) => {
          const isCompleted = completedTopics.includes(topic.id);

          const previousTopic = topics[index - 1];

          const previousCompleted =
            index === 0 ||
            completedTopics.includes(previousTopic?.id);

          let status = "locked";

          if (isCompleted) {
            status = "completed";
          } else if (previousCompleted) {
            status = "current";
          }

          return (
            <div
              className={`learning-map-item ${
                status === "completed"
                  ? "is-completed"
                  : ""
              } ${
                status === "current"
                  ? "is-current"
                  : ""
              }`}
              key={topic.id}
            >
              <div className="learning-map-step">
                <span>
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <div className="learning-map-topic">
                <TopicCard
                  topic={topic}
                  courseId={topic.courseId}
                  status={status}
                />
              </div>

              {index < topics.length - 1 && (
                <div className="map-connector">
                  <span />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default LearningMap;