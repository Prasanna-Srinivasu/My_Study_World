import "./CourseCard.css";

function CourseCard({ course, onClick }) {
  const progress = course.progress || 0;

  return (
    <article
      className="course-card"
      onClick={() => onClick(course)}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onClick(course);
        }
      }}
    >
      <div className="course-card-content">

        {/* Course Icon */}
        <div className="course-card-icon">
          {course.icon || "📚"}
        </div>


        {/* Course Information */}
        <div className="course-info">
          <h2>
            {course.name || course.title}
          </h2>

          <p>
            {course.description ||
              "Learn this course step by step with concepts, practice, and interview preparation."}
          </p>
        </div>


        {/* Course Statistics */}
        <div className="course-card-meta">

          <span className="course-card-topics">
            📖 {course.topics || 0} Topics
          </span>

          <span className="course-card-progress-text">
            {progress}% Complete
          </span>

        </div>


        {/* Progress */}
        <div className="course-card-progress">

          <div className="course-card-progress-header">
            <span>Course Progress</span>

            <strong>
              {progress}%
            </strong>
          </div>

          <div className="course-card-progress-bar">
            <div
              className="course-card-progress-fill"
              style={{
                width: `${progress}%`,
              }}
            />
          </div>

        </div>


        {/* Action */}
        <div className="course-card-action">

          <span>
            View Course
          </span>

          <span aria-hidden="true">
            →
          </span>

        </div>


        {/* Invisible button for compatibility with
            existing interaction behavior */}
        <button
          type="button"
          className="course-card-click-target"
          aria-label={`View ${course.name || course.title || "course"}`}
          onClick={(event) => {
            event.stopPropagation();
            onClick(course);
          }}
        />

      </div>
    </article>
  );
}

export default CourseCard;