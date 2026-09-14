import "./CourseCard.css";

function CourseCard({ course, onClick }) {
  return (
    <div
      className="course-card"
      onClick={() => onClick(course)}
    >
      <div className="course-card-content">
        <div className="course-icon">
          {course.icon || "📚"}
        </div>

        <div className="course-info">
          <h2>{course.name || course.title}</h2>

          <p>
            {course.description ||
              "Learn this course step by step with concepts, practice, and interview preparation."}
          </p>
        </div>

        <div className="course-stats">
          <span>
            📖 {course.topics || 0} Topics
          </span>

          <span>
            📊 {course.progress || 0}% Complete
          </span>
        </div>

        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{
              width: `${course.progress || 0}%`,
            }}
          />
        </div>

        <button
          className="view-course-btn"
          onClick={(event) => {
            event.stopPropagation();
            onClick(course);
          }}
        >
          View Course →
        </button>
      </div>
    </div>
  );
}

export default CourseCard;