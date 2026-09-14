import { useParams, useNavigate } from "react-router-dom";
import { courses } from "../../data/courses";
import { topics } from "../../data/topics";
import LearningMap from "../../components/learning/LearningMap/LearningMap";
import "./CoursePage.css";

function CoursePage() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const course = courses.find((item) => item.id === courseId);

  const courseTopics = topics.filter(
    (topic) => topic.courseId === courseId
  );

  if (!course) {
    return (
      <div className="course-page page-container">
        <h1 className="page-title">Course Not Found</h1>
        <p className="page-subtitle">
          The requested course could not be found.
        </p>
      </div>
    );
  }

  const handleTopicClick = (topic) => {
    navigate(`/topic/${courseId}/${topic.id}`);
  };

  return (
    <div className="course-page page-container">
      <button
        className="course-back-button"
        onClick={() => navigate("/learn")}
      >
        ← Back to Learn
      </button>

      <section className="course-header surface-3d">
        <div className="course-header-icon">
          {course.icon || "📚"}
        </div>

        <div className="course-header-content">
          <span className="course-header-level">
            {course.level || "Beginner"}
          </span>

          <h1>{course.title}</h1>

          <p>{course.description}</p>

          <div className="course-header-meta">
            <span>{courseTopics.length} Topics</span>
            <span>•</span>
            <span>Learning Path</span>
          </div>
        </div>
      </section>

      <section className="course-topics-section">
        <div className="section-heading">
          <div>
            <span className="section-number">01</span>
            <h2>Learning Path</h2>
          </div>

          <p>
            Follow the topics in order and build your knowledge step by step.
          </p>
        </div>

        {courseTopics.length > 0 ? (
          <LearningMap
            topics={courseTopics}
            onTopicClick={handleTopicClick}
          />
        ) : (
          <div className="empty-topics surface-3d">
            <h3>No topics available yet</h3>
            <p>
              Topics for this course will be added soon.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}

export default CoursePage;