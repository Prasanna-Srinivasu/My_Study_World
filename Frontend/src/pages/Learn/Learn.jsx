import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getCourses } from "../../services/courseService";
import { topics } from "../../data/topics";

import CourseCard from "../../components/learning/CourseCard/CourseCard";

import "./Learn.css";

function Learn() {
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadCourses() {
      try {
        const data = await getCourses();
        setCourses(data);
      } catch (err) {
        console.error("Failed to load courses:", err);
        setError("Unable to load courses");
      } finally {
        setLoading(false);
      }
    }

    loadCourses();
  }, []);

  const savedProgress = JSON.parse(
    localStorage.getItem("studyProgress") || "{}"
  );

  const courseNameMap = {
    1: "java",
    2: "spring boot",
    3: "react",
    4: "sql",
    5: "dsa",
  };

  const coursesWithData = courses.map((course) => {
    const courseTopics = topics.filter((topic) => {
      return (
        String(topic.courseId) === String(course.id) ||
        String(topic.courseId).toLowerCase() ===
          courseNameMap[course.id]
      );
    });

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

  if (loading) {
    return (
      <div className="learn-page">
        <div className="page-container">
          <h2>Loading courses...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="learn-page">
        <div className="page-container">
          <h2>{error}</h2>

          <p>
            Make sure your Spring Boot backend is running
            on port 8080.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="learn-page">
      <div className="page-container">

        {/* Header */}
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
              with lessons, videos, practice and
              interview preparation.
            </p>
          </div>

          <div className="learn-summary surface-3d">
            <strong>
              {courses.length}
            </strong>

            <span>
              Courses
            </span>
          </div>

        </div>

        {/* Course Cards */}
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