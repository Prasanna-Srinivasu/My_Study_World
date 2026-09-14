import { useNavigate } from "react-router-dom";

import { courses } from "../../data/courses";
import { topics } from "../../data/topics";

import CourseCard from "../../components/learning/CourseCard/CourseCard";

import "./Learn.css";

function Learn() {
  const navigate = useNavigate();

  const coursesWithData = courses.map((course) => {
    const courseTopics = topics.filter(
      (topic) => topic.courseId === course.id
    );

    const savedProgress = JSON.parse(
      localStorage.getItem("studyProgress") || "{}"
    );

    const completedTopics =
      savedProgress[course.id]?.length || 0;

    const progress =
      courseTopics.length > 0
        ? Math.round(
            (completedTopics / courseTopics.length) * 100
          )
        : 0;

    return {
      ...course,
      topics: courseTopics.length,
      progress,
    };
  });

  const handleCourseClick = (course) => {
    navigate(`/course/${course.id}`);
  };

  return (
    <div className="learn-page">

      <div className="page-container">

        <div className="learn-header">
          <div>
            <span className="learn-label">
              LEARNING HUB
            </span>

            <h1 className="page-title">
              Start Your Learning Journey
            </h1>

            <p className="page-subtitle">
              Choose a course and learn step by step
              with concepts, visuals, videos, practice,
              interviews and coding challenges.
            </p>
          </div>

          <div className="learn-summary surface-3d">
            <strong>{courses.length}</strong>
            <span>Courses</span>
          </div>
        </div>

        <div className="courses-grid">
          {coursesWithData.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onClick={handleCourseClick}
            />
          ))}
        </div>

      </div>

    </div>
  );
}

export default Learn;