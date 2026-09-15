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

  const savedProgress = JSON.parse(
    localStorage.getItem("studyProgress") || "{}"
  );

  const completedTopics =
    savedProgress[courseId]?.length || 0;

  const courseProgress =
    courseTopics.length > 0
      ? Math.round(
          (completedTopics / courseTopics.length) * 100
        )
      : 0;

  if (loading) {
    return (
      <main className="course-page">
        <div className="course-container">
          <section className="course-message surface-3d">
            <span className="course-message-label">
              MY STUDY WORLD
            </span>

            <h2>Loading course...</h2>

            <p>
              Preparing your learning path.
            </p>
          </section>
        </div>
      </main>
    );
  }

  if (!course) {
    return (
      <main className="course-page">
        <div className="course-container">
          <section className="course-message course-message-error surface-3d">
            <span className="course-message-label">
              COURSE NOT FOUND
            </span>

            <h1>We couldn't find this course.</h1>

            <p>
              The course you're looking for may no longer
              be available.
            </p>

            <button
              type="button"
              className="course-back-button"
              onClick={() => navigate("/learn")}
            >
              <span aria-hidden="true">←</span>
              Back to Learn
            </button>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="course-page">
      <div className="course-container">

        <button
          type="button"
          className="course-back-button"
          onClick={() => navigate("/learn")}
        >
          <span aria-hidden="true">←</span>
          Back to Learn
        </button>

        <section className="course-hero surface-3d">
          <div className="course-hero-main">

            <div className="course-hero-icon">
              {course.icon || "📚"}
            </div>

            <div className="course-hero-content">

              <span className="course-level">
                {course.level || "Beginner"}
              </span>

              <span className="course-eyebrow">
                COURSE {String(course.id).padStart(2, "0")}
              </span>

              <h1>
                {course.title || course.name}
              </h1>

              <p>
                {course.description ||
                  "Learn this course step by step through structured lessons, practice, and real-world preparation."}
              </p>

              <div className="course-meta">
                <span>
                  <strong>{courseTopics.length}</strong>
                  {" "}Topics
                </span>

                <span className="course-meta-divider">
                  •
                </span>

                <span>
                  Structured Learning Path
                </span>
              </div>

            </div>
          </div>

          <div className="course-progress-card">
            <div className="course-progress-top">
              <span>Your Progress</span>

              <strong>
                {courseProgress}%
              </strong>
            </div>

            <div className="course-progress-track">
              <div
                className="course-progress-fill"
                style={{
                  width: `${courseProgress}%`,
                }}
              />
            </div>

            <p>
              {completedTopics} of{" "}
              {courseTopics.length} topics completed
            </p>
          </div>
        </section>

        <section className="course-learning-section">

          <div className="course-section-heading">
            <div>
              <span className="course-section-label">
                YOUR PATH
              </span>

              <h2>
                Learning Path
              </h2>
            </div>

            <p>
              Follow each topic in order. Complete one
              lesson and unlock the next step.
            </p>
          </div>

          {courseTopics.length > 0 ? (
            <LearningMap
              topics={courseTopics}
            />
          ) : (
            <div className="course-empty-topics surface-3d">
              <div className="course-empty-icon">
                📚
              </div>

              <h3>
                No topics available yet
              </h3>

              <p>
                Topics for this course will be added soon.
              </p>
            </div>
          )}

        </section>

        <section className="course-bottom-note">
          <span>MY STUDY WORLD</span>

          <p>
            Learn one concept at a time. Practice what
            you learn. Build something real.
          </p>
        </section>

      </div>
    </main>
  );
}

export default CoursePage;