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

  return (
    <div className="learning-map">
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
          <div className="learning-map-item" key={topic.id}>
            <TopicCard
              topic={topic}
              courseId={topic.courseId}
              status={status}
            />

            {index < topics.length - 1 && (
              <div className="map-connector">
                <span></span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default LearningMap;