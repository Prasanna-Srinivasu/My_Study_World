import TopicCard from "../TopicCard/TopicCard";
import "./LearningMap.css";

function LearningMap({ topics = [] }) {
  return (
    <div className="learning-map">
      {topics.map((topic, index) => {
        const status =
          topic.status || (index === 0 ? "current" : "locked");

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