import { useNavigate } from "react-router-dom";
import "./CourseCard.css";

function CourseCard({ course }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/course/${course.id}`);
  };

  return (
    <button className="course-card" onClick={handleClick}>
      <div className="course-card-top">
        <div className="course-icon">
          {course.icon || "📚"}
        </div>

        <span className="course-level">
          {course.level || "Beginner"}
        </span>
      </div>

      <div className="course-card-content">
        <h3>{course.title}</h3>

        <p>{course.description}</p>
      </div>

      <div className="course-card-progress">
        <div className="progress-info">
          <span>Progress</span>

          <strong>
            {course.progress || 0}%
          </strong>
        </div>

        <div className="progress-track">
          <div
            className="progress-fill"
            style={{
              width: `${course.progress || 0}%`,
            }}
          />
        </div>
      </div>

      <div className="course-card-bottom">
        <span>
          {course.topics || 0} Topics
        </span>

        <span className="course-arrow">
          →
        </span>
      </div>
    </button>
  );
}

export default CourseCard;