import { useState } from "react";
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
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [openInterview, setOpenInterview] = useState({});

  const { courseId, topicId } = useParams();
  const navigate = useNavigate();
  const problems = codingProblems[topicId] || [];
  const visual = visuals[topicId];

  const topic = topics.find(
  (item) =>
    String(item.id) === String(topicId) &&
    String(item.courseId) === String(courseId),
);

  const courseTopics = topics.filter(
  (item) => String(item.courseId) === String(courseId)
);

  const currentTopicIndex = courseTopics.findIndex(
    (item) => item.id === topicId,
  );

  const nextTopic = courseTopics[currentTopicIndex + 1];

  const lesson = lessons[topicId];
  const video = videos[topicId];
  const practiceQuestions = practice[topicId] || [];
  const interviewQuestions = interview[topicId] || [];

  // Save completed topic
  const markTopicCompleted = () => {
    const savedProgress = JSON.parse(
      localStorage.getItem("studyProgress") || "{}",
    );

    if (!savedProgress[courseId]) {
      savedProgress[courseId] = [];
    }

    if (!savedProgress[courseId].includes(topicId)) {
      savedProgress[courseId].push(topicId);
    }

    localStorage.setItem("studyProgress", JSON.stringify(savedProgress));

    // Move to next topic
    if (nextTopic) {
      navigate(`/topic/${courseId}/${nextTopic.id}`);
    } else {
      navigate(`/course/${courseId}`);
    }
  };

  const handleAnswer = (questionId, option, correctAnswer) => {
    if (selectedAnswers[questionId]) return;

    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: {
        selected: option,
        correct: option === correctAnswer,
      },
    }));
  };

  // Topic not found
  if (!topic) {
    return (
      <div className="topic-page">
        <h1 className="page-title">Topic Not Found</h1>

        <p className="page-subtitle">The requested topic does not exist.</p>

        <button onClick={() => navigate(`/course/${courseId}`)}>
          ← Back to Course
        </button>
      </div>
    );
  }

  return (
    <div className="topic-page">
      {/* ========================= */}
      {/* TOPIC HEADER */}
      {/* ========================= */}

      <div className="topic-header">
        <div>
          <span className="topic-badge">TOPIC {topic.number}</span>

          <h1>{topic.title}</h1>

          <p>{lesson?.introduction || "Learn this topic step by step."}</p>
        </div>

        <div className="topic-number">
          <span>TOPIC</span>

          <strong>{topic.number}</strong>
        </div>
      </div>

      {/* ========================= */}
      {/* CONCEPT */}
      {/* ========================= */}

      {lesson && (
        <section className="topic-section">
          <div className="section-title">
            <span>01</span>

            <div>
              <h2>Understand the Concept</h2>

              <p>Learn the important ideas behind this topic.</p>
            </div>
          </div>

          <div className="concept-card surface-3d">
            <p className="concept-introduction">{lesson.introduction}</p>

            {lesson.keyPoints?.length > 0 && (
              <ul className="concept-points">
                {lesson.keyPoints.map((point, index) => (
                  <li key={index}>
                    <span>✓</span>

                    <p>{point}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      )}

      {visual && (
        <VisualLearning
          topic={topic.title}
          image={visual.image}
          title={visual.title}
          description={visual.description}
        />
      )}

      {/* ========================= */}
      {/* CODE EXAMPLE */}
      {/* ========================= */}

      {lesson?.example && (
        <section className="topic-section">
          <div className="section-title">
            <span>02</span>

            <div>
              <h2>See It in Code</h2>

              <p>{lesson.example.title}</p>
            </div>
          </div>

          <div className="code-card surface-3d">
            <div className="code-top">
              <span>{lesson.example.language}</span>

              <button
                onClick={() =>
                  navigator.clipboard.writeText(lesson.example.code)
                }
              >
                Copy
              </button>
            </div>

            <pre>{lesson.example.code}</pre>
          </div>
        </section>
      )}

      {/* ========================= */}
      {/* YOUTUBE */}
      {/* ========================= */}

      {video && (
        <section className="topic-section">
          <div className="section-title">
            <span>03</span>

            <div>
              <h2>Learn With Video</h2>

              <p>Watch a topic-specific explanation.</p>
            </div>
          </div>

          <div className="youtube-video-card surface-3d">
            <div className="youtube-icon">▶</div>

            <div className="youtube-content">
              <span>YOUTUBE RESOURCE</span>

              <h3>{topic.title}</h3>

              <p>
                Watch a focused video for this topic. Recommended duration:{" "}
                {video.duration}.
              </p>
            </div>

            <a
              href={`https://www.youtube.com/results?search_query=${encodeURIComponent(
                video.search,
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="youtube-button"
            >
              Watch on YouTube →
            </a>
          </div>
        </section>
      )}

      {/* ========================= */}
      {/* PRACTICE */}
      {/* ========================= */}

      {practiceQuestions.length > 0 && (
        <section className="topic-section">
          <div className="section-title">
            <span>04</span>

            <div>
              <h2>Practice</h2>

              <p>Test your understanding of this topic.</p>
            </div>
          </div>

          <div className="practice-list">
            {practiceQuestions.map((question, index) => {
              const result = selectedAnswers[question.id];

              return (
                <div className="practice-card surface-3d" key={question.id}>
                  <span className="practice-number">Question {index + 1}</span>

                  <h3>{question.question}</h3>

                  <div className="practice-options">
                    {question.options.map((option) => {
                      const isSelected = result?.selected === option;

                      const isCorrect = option === question.answer;

                      let optionClass = "";

                      if (result) {
                        if (isSelected && result.correct) {
                          optionClass = "correct";
                        } else if (isSelected && !result.correct) {
                          optionClass = "wrong";
                        } else if (isCorrect) {
                          optionClass = "correct";
                        }
                      }

                      return (
                        <button
                          key={option}
                          className={optionClass}
                          disabled={!!result}
                          onClick={() =>
                            handleAnswer(question.id, option, question.answer)
                          }
                        >
                          {option}
                        </button>
                      );
                    })}
                  </div>

                  {result && (
                    <div
                      className={`practice-result ${
                        result.correct ? "correct" : "wrong"
                      }`}
                    >
                      <strong>
                        {result.correct ? "✓ Correct!" : "✗ Incorrect"}
                      </strong>

                      <p>{question.explanation}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* ========================= */}
      {/* INTERVIEW */}
      {/* ========================= */}

      {interviewQuestions.length > 0 && (
        <section className="topic-section">
          <div className="section-title">
            <span>05</span>

            <div>
              <h2>Interview Questions</h2>

              <p>Prepare for real interview questions.</p>
            </div>
          </div>

          <div className="interview-list">
            {interviewQuestions.map((item, index) => {
              const isOpen = openInterview[item.id];

              return (
                <div className="interview-card surface-3d" key={item.id}>
                  <div className="interview-card-top">
                    <span>Question {index + 1}</span>

                    <strong>{item.difficulty}</strong>
                  </div>

                  <h3>{item.question}</h3>

                  <button
                    className="interview-answer-btn"
                    onClick={() =>
                      setOpenInterview((prev) => ({
                        ...prev,
                        [item.id]: !prev[item.id],
                      }))
                    }
                  >
                    {isOpen ? "Hide Answer ↑" : "Show Answer →"}
                  </button>

                  {isOpen && (
                    <div className="interview-answer">
                      <span>Answer</span>

                      <p>{item.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* ========================= */}
      {/* CODING PROBLEMS */}
      {/* ========================= */}

      {problems.length > 0 && (
        <section className="topic-section">
          <div className="section-title">
            <span>06</span>

            <div>
              <h2>Coding Problems</h2>

              <p>Practice coding problems related to this topic.</p>
            </div>
          </div>

          <div className="coding-problems-list">
            {problems.map((problem, index) => (
              <div className="coding-problem-card surface-3d" key={problem.id}>
                <div className="coding-problem-top">
                  <span>Problem {index + 1}</span>

                  <strong>{problem.difficulty}</strong>
                </div>

                <h3>{problem.title}</h3>

                <p>{problem.description}</p>

                <span className="coding-language">{problem.language}</span>

                <button className="coding-start-btn">Solve Problem →</button>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ========================= */}
      {/* COMPLETE / NAVIGATION */}
      {/* ========================= */}

      <div className="topic-navigation">
        <button onClick={() => navigate(`/course/${courseId}`)}>
          ← Back to Course
        </button>

        <button className="next-topic-btn" onClick={markTopicCompleted}>
          {nextTopic ? "Complete & Continue →" : "Complete Course ✓"}
        </button>
      </div>
    </div>
  );
}

export default TopicPage;
