import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { topics } from "../../data/topics";
import { lessons } from "../../data/lessons";
import { videos } from "../../data/videos";
import { practice } from "../../data/practice";
import { interview } from "../../data/interview";
import { codingProblems } from "../../data/codingProblems";
import VisualLearning from "../../components/learning/VisualLearning/VisualLearning";
import { visuals } from "../../data/visuals";

import "./TopicPage.css";

function TopicPage() {
  const { courseId, topicId } = useParams();
  const navigate = useNavigate();

  const topic = topics.find(
    (item) =>
      String(item.id) === String(topicId) &&
      String(item.courseId) === String(courseId)
  );

  const [videoCompleted, setVideoCompleted] =
    useState(false);

  const [practiceAnswers, setPracticeAnswers] =
    useState({});

  const [interviewViewed, setInterviewViewed] =
    useState({});

  const [openInterview, setOpenInterview] =
    useState({});

  const [codingCompleted, setCodingCompleted] =
    useState([]);

  useEffect(() => {
    if (!topic) return;

    try {
      const savedVideoProgress = JSON.parse(
        localStorage.getItem("videoProgress") || "{}"
      );

      setVideoCompleted(
        Boolean(
          savedVideoProgress[courseId]?.[topicId]
        )
      );

      const savedPracticeProgress = JSON.parse(
        localStorage.getItem("practiceProgress") || "{}"
      );

      setPracticeAnswers(
        savedPracticeProgress[courseId]?.[topicId] || {}
      );

      const savedInterviewProgress = JSON.parse(
        localStorage.getItem("interviewProgress") || "{}"
      );

      setInterviewViewed(
        savedInterviewProgress[courseId]?.[topicId] || {}
      );

      const savedCodingProgress = JSON.parse(
        localStorage.getItem("codingProgress") || "{}"
      );

      setCodingCompleted(
        savedCodingProgress[courseId]?.[topicId] || []
      );
    } catch (error) {
      console.error(
        "Failed to load topic progress:",
        error
      );
    }
  }, [courseId, topicId, topic]);

  if (!topic) {
    return (
      <main className="topic-page">
        <div className="topic-page-container">
          <section className="topic-not-found surface-3d">
            <span className="topic-page-label">
              MY STUDY WORLD
            </span>

            <h1>Topic not found</h1>

            <p>
              The learning topic you are looking for
              could not be found.
            </p>

            <button
              type="button"
              className="topic-back-button"
              onClick={() =>
                navigate(`/course/${courseId}`)
              }
            >
              <span aria-hidden="true">←</span>
              Back to Course
            </button>
          </section>
        </div>
      </main>
    );
  }

  const topicLesson = lessons.find(
    (lesson) =>
      String(lesson.topicId) === String(topicId) &&
      String(lesson.courseId) === String(courseId)
  );

  const topicVideo = videos.find(
    (video) =>
      String(video.topicId) === String(topicId) &&
      String(video.courseId) === String(courseId)
  );

  const topicVisual = visuals[topicId];

  const practiceQuestions =
    practice[topicId] || [];

  const interviewQuestions =
    interview[topicId] || [];

  const problems =
    codingProblems[topicId] || [];

  const practiceAnsweredCount =
    Object.keys(practiceAnswers).length;

  const practiceCompleted =
    practiceQuestions.length === 0 ||
    practiceAnsweredCount >= practiceQuestions.length;

  const interviewCompleted =
    interviewQuestions.length === 0 ||
    interviewQuestions.every(
      (question) => interviewViewed[question.id]
    );

  const codingRequirementCompleted =
    problems.length === 0 ||
    problems.every((problem) =>
      codingCompleted.includes(problem.id)
    );

  const topicCompleted =
    (!topicVideo || videoCompleted) &&
    practiceCompleted &&
    interviewCompleted &&
    codingRequirementCompleted;

  const handleVideo = () => {
    navigate(`/video/${courseId}/${topicId}`);
  };

  const handlePracticeAnswer = (
    questionId,
    answer
  ) => {
    const updatedAnswers = {
      ...practiceAnswers,
      [questionId]: answer,
    };

    setPracticeAnswers(updatedAnswers);

    const savedPracticeProgress =
      JSON.parse(
        localStorage.getItem(
          "practiceProgress"
        ) || "{}"
      );

    if (!savedPracticeProgress[courseId]) {
      savedPracticeProgress[courseId] = {};
    }

    savedPracticeProgress[courseId][topicId] =
      updatedAnswers;

    localStorage.setItem(
      "practiceProgress",
      JSON.stringify(savedPracticeProgress)
    );
  };

  const toggleInterview = (questionId) => {
    setOpenInterview((previous) => ({
      ...previous,
      [questionId]: !previous[questionId],
    }));

    setInterviewViewed((previous) => {
      const updatedViewed = {
        ...previous,
        [questionId]: true,
      };

      const savedInterviewProgress =
        JSON.parse(
          localStorage.getItem(
            "interviewProgress"
          ) || "{}"
        );

      if (!savedInterviewProgress[courseId]) {
        savedInterviewProgress[courseId] = {};
      }

      savedInterviewProgress[courseId][topicId] =
        updatedViewed;

      localStorage.setItem(
        "interviewProgress",
        JSON.stringify(
          savedInterviewProgress
        )
      );

      return updatedViewed;
    });
  };

  const handleCoding = (problemId) => {
    navigate(
      `/coding/${courseId}/${topicId}/${problemId}`
    );
  };

  const markTopicCompleted = () => {
    if (!topicCompleted) return;

    const savedProgress = JSON.parse(
      localStorage.getItem("studyProgress") || "{}"
    );

    const currentProgress =
      savedProgress[courseId] || [];

    if (!currentProgress.includes(topic.id)) {
      savedProgress[courseId] = [
        ...currentProgress,
        topic.id,
      ];

      localStorage.setItem(
        "studyProgress",
        JSON.stringify(savedProgress)
      );
    }
  };

  const handleCompleteTopic = () => {
    if (!topicCompleted) return;

    markTopicCompleted();

    navigate(`/course/${courseId}`);
  };

  return (
    <main className="topic-page">
      <div className="topic-page-container">

        <button
          type="button"
          className="topic-back-button"
          onClick={() =>
            navigate(`/course/${courseId}`)
          }
        >
          <span aria-hidden="true">←</span>
          Back to Course
        </button>

        {/* HERO */}

        <section className="topic-hero surface-3d">
          <div className="topic-hero-content">

            <span className="topic-page-label">
              TOPIC{" "}
              {String(topic.number).padStart(2, "0")}
            </span>

            <h1>{topic.title}</h1>

            <p>
              {topic.description ||
                "Learn this concept step by step with explanations, visuals, videos, practice, interview preparation, and coding challenges."}
            </p>

            <div className="topic-hero-meta">

              <span>
                <strong>
                  {String(topic.number).padStart(2, "0")}
                </strong>

                Current Topic
              </span>

              <span className="topic-meta-divider">
                •
              </span>

              <span>
                Learn → Practice → Build
              </span>

            </div>
          </div>

          <div
            className="topic-number-large"
            aria-hidden="true"
          >
            {String(topic.number).padStart(2, "0")}
          </div>
        </section>

        {/* 01 CONCEPT */}

        <section
          id="concept"
          className="topic-section"
        >
          <div className="topic-section-heading">

            <div>
              <span className="topic-section-label">
                01 • UNDERSTAND
              </span>

              <h2>
                Understand the Concept
              </h2>
            </div>

            <p>
              Build a clear foundation before
              moving into practice.
            </p>

          </div>

          <div className="topic-concept-card surface-3d">

            <h3>
              {topicLesson?.title ||
                `What is ${topic.title}?`}
            </h3>

            <p>
              {topicLesson?.content ||
                topic.description ||
                `Learn the fundamental ideas behind ${topic.title} and understand how the concept works.`}
            </p>

            <div className="topic-concept-points">

              <div>
                <span>✓</span>
                <p>
                  Learn the core idea.
                </p>
              </div>

              <div>
                <span>✓</span>
                <p>
                  Understand how it works.
                </p>
              </div>

              <div>
                <span>✓</span>
                <p>
                  Know when to use it.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* 02 VISUAL */}

        {topicVisual && (
          <section
            id="visual"
            className="topic-section"
          >
            <div className="topic-section-heading">

              <div>
                <span className="topic-section-label">
                  02 • VISUAL
                </span>

                <h2>
                  Visual Learning
                </h2>
              </div>

              <p>
                Understand the concept visually.
              </p>

            </div>

            <VisualLearning
              topic={topic.title}
              image={topicVisual.image}
              title={topicVisual.title}
              description={
                topicVisual.description
              }
            />
          </section>
        )}

        {/* 03 CODE */}

        {topicLesson?.code && (
          <section
            id="code"
            className="topic-section"
          >
            <div className="topic-section-heading">

              <div>
                <span className="topic-section-label">
                  03 • CODE
                </span>

                <h2>
                  See It in Code
                </h2>
              </div>

              <p>
                Connect the concept with a
                practical programming example.
              </p>

            </div>

            <div className="topic-code-card">

              <div className="topic-code-header">
                <span>JAVA</span>
                <span>
                  Example
                </span>
              </div>

              <pre>
                {topicLesson.code}
              </pre>

            </div>
          </section>
        )}

        {/* 04 VIDEO */}

        {topicVideo && (
          <section
            id="video"
            className="topic-section"
          >
            <div className="topic-section-heading">

              <div>
                <span className="topic-section-label">
                  04 • VIDEO
                </span>

                <h2>
                  Learn With Video
                </h2>
              </div>

              <p>
                Reinforce the concept with a
                focused explanation.
              </p>

            </div>

            <div className="topic-video-card surface-3d">

              <div className="topic-video-icon">
                ▶
              </div>

              <div>
                <span>
                  VIDEO LESSON
                </span>

                <h3>
                  {topicVideo.title ||
                    "Watch & Understand"}
                </h3>

                <p>
                  Complete the video lesson
                  before finishing this topic.
                </p>
              </div>

              <button
                type="button"
                className="topic-action-button"
                onClick={handleVideo}
              >
                {videoCompleted
                  ? "Watch Again"
                  : "Watch Video"}

                <span aria-hidden="true">
                  →
                </span>
              </button>

            </div>
          </section>
        )}

        {/* 05 PRACTICE */}

        <section
          id="practice"
          className="topic-section"
        >
          <div className="topic-section-heading">

            <div>
              <span className="topic-section-label">
                05 • PRACTICE
              </span>

              <h2>
                Put It Into Practice
              </h2>
            </div>

            <p>
              Test your understanding before
              moving forward.
            </p>

          </div>

          {practiceQuestions.length > 0 ? (
            <div className="topic-practice-list">

              {practiceQuestions.map(
                (question, index) => {

                  const selectedAnswer =
                    practiceAnswers[
                      question.id
                    ];

                  return (
                    <article
                      className="topic-practice-card surface-3d"
                      key={question.id}
                    >
                      <span className="topic-question-number">
                        Question {index + 1}
                      </span>

                      <h3>
                        {question.question}
                      </h3>

                      <div className="topic-practice-options">

                        {question.options?.map(
                          (option) => (
                            <button
                              type="button"
                              key={option}
                              className={`topic-practice-option ${
                                selectedAnswer ===
                                option
                                  ? "selected"
                                  : ""
                              }`}
                              onClick={() =>
                                handlePracticeAnswer(
                                  question.id,
                                  option
                                )
                              }
                            >
                              {option}
                            </button>
                          )
                        )}

                      </div>
                    </article>
                  );
                }
              )}

            </div>
          ) : (
            <div className="topic-empty-card surface-3d">
              Practice questions will be
              added for this topic.
            </div>
          )}
        </section>

        {/* 06 INTERVIEW */}

        <section
          id="interview"
          className="topic-section"
        >
          <div className="topic-section-heading">

            <div>
              <span className="topic-section-label">
                06 • INTERVIEW
              </span>

              <h2>
                Interview Questions
              </h2>
            </div>

            <p>
              Prepare to explain the concept
              clearly in an interview.
            </p>

          </div>

          {interviewQuestions.length > 0 ? (
            <div className="topic-interview-list">

              {interviewQuestions.map(
                (question, index) => {

                  const isOpen =
                    openInterview[
                      question.id
                    ];

                  return (
                    <article
                      className="topic-interview-card surface-3d"
                      key={question.id}
                    >
                      <button
                        type="button"
                        className="topic-interview-question"
                        onClick={() =>
                          toggleInterview(
                            question.id
                          )
                        }
                      >
                        <span>
                          Q{index + 1}.{" "}
                          {question.question}
                        </span>

                        <span>
                          {isOpen
                            ? "−"
                            : "+"}
                        </span>
                      </button>

                      {isOpen && (
                        <div className="topic-interview-answer">
                          {question.answer}
                        </div>
                      )}
                    </article>
                  );
                }
              )}

            </div>
          ) : (
            <div className="topic-empty-card surface-3d">
              Interview questions will be
              added for this topic.
            </div>
          )}
        </section>

        {/* 07 CODING */}

        <section
          id="coding"
          className="topic-section"
        >
          <div className="topic-section-heading">

            <div>
              <span className="topic-section-label">
                07 • CODING
              </span>

              <h2>
                Coding Problems
              </h2>
            </div>

            <p>
              Apply what you learned by
              solving coding challenges.
            </p>

          </div>

          {problems.length > 0 ? (
            <div className="topic-coding-list">

              {problems.map(
                (problem, index) => {

                  const completed =
                    codingCompleted.includes(
                      problem.id
                    );

                  return (
                    <article
                      className={`topic-coding-card surface-3d ${
                        completed
                          ? "completed"
                          : ""
                      }`}
                      key={problem.id}
                    >
                      <div className="topic-coding-number">
                        {String(
                          index + 1
                        ).padStart(2, "0")}
                      </div>

                      <div className="topic-coding-content">

                        <span>
                          {problem.difficulty ||
                            "PRACTICE"}
                        </span>

                        <h3>
                          {problem.title}
                        </h3>

                        <p>
                          {problem.description}
                        </p>

                      </div>

                      <button
                        type="button"
                        className="topic-action-button"
                        onClick={() =>
                          handleCoding(
                            problem.id
                          )
                        }
                      >
                        {completed
                          ? "Practice Again"
                          : "Solve Problem"}

                        <span aria-hidden="true">
                          →
                        </span>
                      </button>
                    </article>
                  );
                }
              )}

            </div>
          ) : (
            <div className="topic-empty-card surface-3d">
              No coding problems are available
              for this topic yet.
            </div>
          )}
        </section>

        {/* COMPLETION */}

        <section className="topic-completion-card surface-3d">

          <div>
            <span className="topic-section-label">
              TOPIC PROGRESS
            </span>

            <h2>
              {topicCompleted
                ? "Topic Completed"
                : "Finish Your Learning Path"}
            </h2>

            <p>
              {topicCompleted
                ? "Excellent work. You have completed all required activities for this topic."
                : "Complete the required learning activities before moving to the next topic."}
            </p>
          </div>

          <div className="topic-completion-checklist">

            <div
              className={
                topicVideo && !videoCompleted
                  ? ""
                  : "complete"
              }
            >
              <span>
                {topicVideo && !videoCompleted
                  ? "○"
                  : "✓"}
              </span>
              Video
            </div>

            <div
              className={
                practiceCompleted
                  ? "complete"
                  : ""
              }
            >
              <span>
                {practiceCompleted
                  ? "✓"
                  : "○"}
              </span>
              Practice
            </div>

            <div
              className={
                interviewCompleted
                  ? "complete"
                  : ""
              }
            >
              <span>
                {interviewCompleted
                  ? "✓"
                  : "○"}
              </span>
              Interview
            </div>

            <div
              className={
                codingRequirementCompleted
                  ? "complete"
                  : ""
              }
            >
              <span>
                {codingRequirementCompleted
                  ? "✓"
                  : "○"}
              </span>
              Coding
            </div>

          </div>

          <button
            type="button"
            className="topic-complete-button"
            disabled={!topicCompleted}
            onClick={handleCompleteTopic}
          >
            {topicCompleted
              ? "Complete Topic →"
              : "Complete Required Activities"}
          </button>

        </section>

        {/* BOTTOM */}

        <section className="topic-bottom surface-3d">

          <div className="topic-bottom-mark">
            MS
          </div>

          <div>
            <span>
              LEARN • PRACTICE • BUILD
            </span>

            <p>
              Understand the idea. Try it
              yourself. Then build something
              with it.
            </p>
          </div>

        </section>

      </div>
    </main>
  );
}

export default TopicPage;