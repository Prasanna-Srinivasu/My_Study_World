import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getCourses } from "../../services/courseService";
import { topics } from "../../data/topics";

import CourseCard from "../../components/learning/CourseCard/CourseCard";

import "./Home.css";

function Home() {
  const navigate = useNavigate();

  // Courses coming from Spring Boot
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch courses from backend
  useEffect(() => {
    async function loadCourses() {
      try {
        const data = await getCourses();
        setCourses(data);
      } catch (err) {
        console.error("Failed to load courses:", err);
        setError("Unable to load courses.");
      } finally {
        setLoading(false);
      }
    }

    loadCourses();
  }, []);

  const studyProgress = JSON.parse(
    localStorage.getItem("studyProgress") || "{}"
  );

  const totalTopics = topics.length;

  const completedTopics = Object.values(studyProgress)
    .flat()
    .length;

  const overallProgress =
    totalTopics > 0
      ? Math.round((completedTopics / totalTopics) * 100)
      : 0;

  const courseNameMap = {
  1: "java-full-stack",
  2: "spring-boot",
  3: "react",
  4: "sql",
  5: "dsa",
};

const coursesWithData = courses.map((course) => {
  const mappedCourseId =
    courseNameMap[course.id] || course.id;

  const courseTopics = topics.filter(
    (topic) =>
      String(topic.courseId) === String(mappedCourseId)
  );

  const completed =
    studyProgress[mappedCourseId]?.length || 0;

  const progress =
    courseTopics.length > 0
      ? Math.round(
          (completed / courseTopics.length) * 100
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
    <div className="home-page">
      <div className="page-container">

        {/* HERO */}

        <section className="home-hero surface-3d">

          <div className="home-hero-content">

            <span className="home-label">
              MY STUDY WORLD
            </span>

            <h1>
              Learn. Practice.
              <br />
              Build Your Future.
            </h1>

            <p>
              Learn programming through interactive
              topics, visual explanations, videos,
              practice questions, interview preparation
              and real coding challenges.
            </p>

            <button
              className="home-start-btn"
              onClick={() => navigate("/learn")}
            >
              Start Learning →
            </button>

          </div>

          <div className="home-hero-visual">
            <div className="hero-orb">
              💻
            </div>
          </div>

        </section>

        {/* STATS */}

        <section className="home-stats">

          <div className="home-stat-card surface-3d">
            <span>📚</span>
            <strong>{courses.length}</strong>
            <p>Courses</p>
          </div>

          <div className="home-stat-card surface-3d">
            <span>🧠</span>
            <strong>{totalTopics}</strong>
            <p>Total Topics</p>
          </div>

          <div className="home-stat-card surface-3d">
            <span>✓</span>
            <strong>{completedTopics}</strong>
            <p>Completed</p>
          </div>

          <div className="home-stat-card surface-3d">
            <span>📈</span>
            <strong>{overallProgress}%</strong>
            <p>Overall Progress</p>
          </div>

        </section>

        {/* COURSES */}

        <section className="home-courses">

          <div className="home-section-header">

            <div>
              <span className="home-section-label">
                YOUR COURSES
              </span>

              <h2>Continue Learning</h2>

              <p>
                Pick a course and continue your
                learning journey.
              </p>
            </div>

            <button
              onClick={() => navigate("/learn")}
              className="view-all-btn"
            >
              View All →
            </button>

          </div>

          <div className="home-courses-grid">

            {loading && (
              <p>Loading courses...</p>
            )}

            {!loading && error && (
              <p>{error}</p>
            )}

            {!loading &&
              !error &&
              coursesWithData
                .slice(0, 3)
                .map((course) => (
                  <CourseCard
                    key={course.id}
                    course={course}
                    onClick={handleCourseClick}
                  />
                ))}

          </div>

        </section>

        {/* FEATURES */}

        <section className="home-features">

          <div className="home-section-header">

            <div>
              <span className="home-section-label">
                LEARNING EXPERIENCE
              </span>

              <h2>Everything You Need</h2>
            </div>

          </div>

          <div className="home-feature-grid">

            <div className="home-feature-card surface-3d">
              <span>🎯</span>
              <h3>Topic-Based Learning</h3>
              <p>
                Follow a structured learning path
                one topic at a time.
              </p>
            </div>

            <div className="home-feature-card surface-3d">
              <span>🎬</span>
              <h3>Visual Learning</h3>
              <p>
                Learn concepts through visuals,
                diagrams and topic-specific videos.
              </p>
            </div>

            <div className="home-feature-card surface-3d">
              <span>💻</span>
              <h3>Practice & Coding</h3>
              <p>
                Test your knowledge and solve
                real coding problems.
              </p>
            </div>

            <div className="home-feature-card surface-3d">
              <span>🎤</span>
              <h3>Interview Preparation</h3>
              <p>
                Practice interview questions and
                prepare for real developer roles.
              </p>
            </div>

          </div>

        </section>

      </div>
    </div>
  );
}

export default Home;