import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { getCourses } from "../../services/courseService";
import { topics } from "../../data/topics";

import LearningMap from "../../components/learning/LearningMap/LearningMap";

import "./CoursePage.css";

function CoursePage() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCourse() {
      try {
        const data = await getCourses();

        const selectedCourse = data.find(
          (item) => String(item.id) === String(courseId)
        );

        setCourse(selectedCourse || null);
      } catch (error) {
        console.error("Failed to load course:", error);
        setCourse(null);
      } finally {
        setLoading(false);
      }
    }

    loadCourse();
  }, [courseId]);

  /*
   * Backend course IDs:
   * 1 → Java
   * 2 → Spring Boot
   * 3 → React
   * 4 → SQL
   * 5 → DSA
   */
 const courseNameMap = {
  1: "java-full-stack",
  2: "spring-boot",
  3: "react",
  4: "sql",
  5: "dsa",
};

  const courseTopics = topics.filter((topic) => {
    return (
      String(topic.courseId) === String(courseId) ||
      String(topic.courseId).toLowerCase() ===
        courseNameMap[courseId]
    );
  });

  const handleTopicClick = (topic) => {
    navigate(`/topic/${courseId}/${topic.id}`);
  };

  if (loading) {
    return (
      <div className="course-page page-container">
        <h2>Loading course...</h2>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="course-page page-container">
        <h1 className="page-title">Course Not Found</h1>

        <p className="page-subtitle">
          The requested course could not be found.
        </p>

        <button
          className="course-back-button"
          onClick={() => navigate("/learn")}
        >
          ← Back to Learn
        </button>
      </div>
    );
  }

  return (
    <div className="course-page page-container">

      {/* Back */}
      <button
        className="course-back-button"
        onClick={() => navigate("/learn")}
      >
        ← Back to Learn
      </button>

      {/* Course Header */}
      <section className="course-header surface-3d">

        <div className="course-header-icon">
          {course.icon || "📚"}
        </div>

        <div className="course-header-content">

          <span className="course-header-level">
            {course.level || "Beginner"}
          </span>

          <h1>
            {course.title || course.name}
          </h1>

          <p>
            {course.description ||
              "Learn this course step by step."}
          </p>

          <div className="course-header-meta">
            <span>
              {courseTopics.length} Topics
            </span>

            <span>•</span>

            <span>
              Learning Path
            </span>
          </div>

        </div>
      </section>

      {/* Learning Path */}
      <section className="course-topics-section">

        <div className="section-heading">

          <div>
            <span className="section-number">
              01
            </span>

            <h2>
              Learning Path
            </h2>
          </div>

          <p>
            Follow the topics in order and build
            your knowledge step by step.
          </p>

        </div>

        {courseTopics.length > 0 ? (
          <LearningMap
            topics={courseTopics}
            onTopicClick={handleTopicClick}
          />
        ) : (
          <div className="empty-topics surface-3d">

            <h3>
              No topics available yet
            </h3>

            <p>
              Topics for this course will be
              added soon.
            </p>

          </div>
        )}

      </section>

    </div>
  );
}

export default CoursePage;