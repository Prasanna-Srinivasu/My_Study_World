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

  const [selectedAnswers, setSelectedAnswers] = useState(() => {
    const savedPracticeProgress = JSON.parse(
      localStorage.getItem("practiceProgress") || "{}"
    );

    return savedPracticeProgress[courseId]?.[topicId] || {};
  });
  const [openInterview, setOpenInterview] = useState({});
  const [viewedInterview, setViewedInterview] = useState({});
  const [videoCompleted, setVideoCompleted] = useState(false);

  useEffect(() => {
    const savedVideoProgress = JSON.parse(
      localStorage.getItem("videoProgress") || "{}"
    );

    const completed =
      savedVideoProgress[courseId]?.[topicId] === true;

    setVideoCompleted(completed);
  }, [courseId, topicId]);



  const problems = codingProblems[topicId] || [];
  const visual = visuals[topicId];

  const topic = topics.find(
    (item) =>
      String(item.id) === String(topicId) &&
      String(item.courseId) === String(courseId),
  );

  const courseTopics = topics.filter(
    (item) => String(item.courseId) === String(courseId),
  );

  const currentTopicIndex = courseTopics.findIndex(
    (item) => String(item.id) === String(topicId),
  );

  const nextTopic = courseTopics[currentTopicIndex + 1];

  const lesson = lessons[topicId];
  const video = videos[topicId];
  const practiceQuestions = practice[topicId] || [];
  const interviewQuestions = interview[topicId] || [];

  // =========================================================
  // PRACTICE SCORE
  // =========================================================

  const answeredPracticeCount = Object.keys(selectedAnswers).length;

  const correctPracticeCount = Object.values(selectedAnswers).filter(
    (answer) => answer.correct,
  ).length;

  const practiceCompleted =
    practiceQuestions.length === 0 ||
    answeredPracticeCount === practiceQuestions.length;

  const practiceScore =
    practiceQuestions.length > 0
      ? Math.round(
        (correctPracticeCount / practiceQuestions.length) * 100,
      )
      : 100;

  // =========================================================
  // INTERVIEW COMPLETION
  // =========================================================

  const viewedInterviewCount = Object.values(viewedInterview).filter(
    Boolean,
  ).length;

  const interviewCompleted =
    interviewQuestions.length === 0 ||
    viewedInterviewCount === interviewQuestions.length;

  // =========================================================
  // CODING
  // =========================================================
  //
  // IMPORTANT:
  // The current project does not yet contain a real coding IDE
  // or test-case execution system.
  //
  // Therefore codingCompleted MUST remain false.
  //
  // We will connect this to the real test-case result later.
  //

  const savedCodingProgress = JSON.parse(
    localStorage.getItem("codingProgress") || "{}"
  );

  const completedCodingProblems =
    savedCodingProgress[courseId]?.[topicId] || [];

  const codingCompleted =
    problems.length === 0 ||
    problems.every((problem) =>
      completedCodingProblems.includes(problem.id)
    );

  // =========================================================
  // FINAL TOPIC COMPLETION
  // =========================================================

  const topicCompleted =
    (!video || videoCompleted) &&
    practiceCompleted &&
    interviewCompleted &&
    codingCompleted;

  // =========================================================
  // SAVE COMPLETED TOPIC
  // =========================================================

  const markTopicCompleted = () => {
    if (!topicCompleted) return;

    const savedProgress = JSON.parse(
      localStorage.getItem("studyProgress") || "{}",
    );

    if (!savedProgress[courseId]) {
      savedProgress[courseId] = [];
    }

    if (!savedProgress[courseId].includes(topicId)) {
      savedProgress[courseId].push(topicId);
    }

    localStorage.setItem(
      "studyProgress",
      JSON.stringify(savedProgress),
    );

    if (nextTopic) {
      navigate(`/topic/${courseId}/${nextTopic.id}`);
    } else {
      navigate(`/course/${courseId}`);
    }
  };

  // =========================================================
  // PRACTICE ANSWER
  // =========================================================

  const handleAnswer = (questionId, option, correctAnswer) => {
    if (selectedAnswers[questionId]) return;

    setSelectedAnswers((prev) => {
      const updatedAnswers = {
        ...prev,
        [questionId]: {
          selected: option,
          correct: option === correctAnswer,
        },
      };

      const savedPracticeProgress = JSON.parse(
        localStorage.getItem("practiceProgress") || "{}"
      );

      if (!savedPracticeProgress[courseId]) {
        savedPracticeProgress[courseId] = {};
      }

      savedPracticeProgress[courseId][topicId] = updatedAnswers;

      localStorage.setItem(
        "practiceProgress",
        JSON.stringify(savedPracticeProgress)
      );

      return updatedAnswers;
    });
  };

  // =========================================================
  // INTERVIEW ANSWER VIEW
  // =========================================================

  const toggleInterview = (questionId) => {
    setOpenInterview((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }));

    setViewedInterview((prev) => ({
      ...prev,
      [questionId]: true,
    }));
  };

  // =========================================================
  // TOPIC NOT FOUND
  // =========================================================

  if (!topic) {
    return (
      <div className="topic-page">
        <h1 className="page-title">Topic Not Found</h1>

        <p className="page-subtitle">
          The requested topic does not exist.
        </p>

        <button onClick={() => navigate(`/course/${courseId}`)}>
          ← Back to Course
        </button>
      </div>
    );
  }

  return (
    <div className="topic-page">

      {/* ================================================= */}
      {/* TOPIC HEADER */}
      {/* ================================================= */}

      <div className="topic-header">
        <div>
          <span className="topic-badge">
            TOPIC {topic.number}
          </span>

          <h1>{topic.title}</h1>

          <p>
            {lesson?.introduction ||
              "Learn this topic step by step."}
          </p>
        </div>

        <div className="topic-number">
          <span>TOPIC</span>

          <strong>{topic.number}</strong>
        </div>
      </div>

      {/* ================================================= */}
      {/* CONCEPT */}
      {/* ================================================= */}

      {lesson && (
        <section
          id="practice"
          className="topic-section"
        >

          <div className="section-title">
            <span>01</span>

            <div>
              <h2>Understand the Concept</h2>

              <p>
                Learn the topic properly before moving to practice.
              </p>
            </div>
          </div>

          {/* INTRODUCTION */}

          <div className="concept-card surface-3d">

            <h3>Introduction</h3>

            <p className="concept-introduction">
              {lesson.introduction}
            </p>

          </div>

          {/* DEFINITION */}

          {lesson.definition && (
            <div className="concept-card surface-3d">

              <h3>What is it?</h3>

              <p className="concept-introduction">
                {lesson.definition}
              </p>

            </div>
          )}

          {/* DETAILED EXPLANATION */}

          {lesson.detailedExplanation && (
            <div className="concept-card surface-3d">

              <h3>Detailed Explanation</h3>

              <p className="concept-introduction">
                {lesson.detailedExplanation}
              </p>

            </div>
          )}

          {/* WHY IT IS NEEDED */}

          {lesson.whyProgramming && (
            <div className="concept-card surface-3d">

              <h3>Why is it Needed?</h3>

              <p className="concept-introduction">
                {lesson.whyProgramming}
              </p>

            </div>
          )}

          {/* HOW IT WORKS */}

          {lesson.howProgrammingWorks?.length > 0 && (
            <div className="concept-card surface-3d">

              <h3>How Does It Work?</h3>

              <div className="concept-points">

                {lesson.howProgrammingWorks.map(
                  (step, index) => (
                    <div key={index}>
                      <strong>{step.title}</strong>

                      <p>
                        {step.explanation}
                      </p>
                    </div>
                  ),
                )}

              </div>

            </div>
          )}

          {/* KEY POINTS */}

          {lesson.keyPoints?.length > 0 && (
            <div className="concept-card surface-3d">

              <h3>Key Points to Remember</h3>

              <ul className="concept-points">

                {lesson.keyPoints.map(
                  (point, index) => (
                    <li key={index}>
                      <span>✓</span>

                      <p>{point}</p>
                    </li>
                  ),
                )}

              </ul>

            </div>
          )}

          {/* REAL LIFE EXAMPLE */}

          {lesson.realLifeExample && (
            <div className="concept-card surface-3d">

              <h3>
                {lesson.realLifeExample.title}
              </h3>

              <h4>Situation</h4>

              <p className="concept-introduction">
                {lesson.realLifeExample.situation}
              </p>

              <h4>How does this connect to Programming?</h4>

              <p className="concept-introduction">
                {lesson.realLifeExample.connection}
              </p>

              <h4>What should you learn from this?</h4>

              <p className="concept-introduction">
                {lesson.realLifeExample.lesson}
              </p>

            </div>
          )}

          {/* INPUT PROCESS OUTPUT */}

          {lesson.inputProcessOutput && (
            <div className="concept-card surface-3d">

              <h3>Input → Process → Output</h3>

              <div className="concept-points">

                <div>
                  <strong>Input</strong>

                  <p>
                    {lesson.inputProcessOutput.input}
                  </p>
                </div>

                <div>
                  <strong>Process</strong>

                  <p>
                    {lesson.inputProcessOutput.process}
                  </p>
                </div>

                <div>
                  <strong>Output</strong>

                  <p>
                    {lesson.inputProcessOutput.output}
                  </p>
                </div>

              </div>

            </div>
          )}

          {/* WHEN TO USE */}

          {lesson.whenToUse?.length > 0 && (
            <div className="concept-card surface-3d">

              <h3>When to Use</h3>

              <ul className="concept-points">

                {lesson.whenToUse.map(
                  (item, index) => (
                    <li key={index}>
                      <span>✓</span>

                      <p>{item}</p>
                    </li>
                  ),
                )}

              </ul>

            </div>
          )}

          {/* WHEN NOT TO USE */}

          {lesson.whenNotToUse?.length > 0 && (
            <div className="concept-card surface-3d">

              <h3>When NOT to Use</h3>

              <ul className="concept-points">

                {lesson.whenNotToUse.map(
                  (item, index) => (
                    <li key={index}>
                      <span>•</span>

                      <p>{item}</p>
                    </li>
                  ),
                )}

              </ul>

            </div>
          )}

          {/* COMMON MISTAKES */}

          {lesson.commonMistakes?.length > 0 && (
            <div className="concept-card surface-3d">

              <h3>Common Mistakes</h3>

              <ul className="concept-points">

                {lesson.commonMistakes.map(
                  (mistake, index) => (
                    <li key={index}>
                      <span>!</span>

                      <p>{mistake}</p>
                    </li>
                  ),
                )}

              </ul>

            </div>
          )}

          {/* QUICK ANSWER */}

          {lesson.quickAnswer && (
            <div className="concept-card surface-3d">

              <h3>Quick One-Line Answer</h3>

              <p className="concept-introduction">
                <strong>{lesson.quickAnswer}</strong>
              </p>

            </div>
          )}

          {/* CHEAT CODE */}

          {lesson.cheatCode && (
            <div className="concept-card surface-3d">

              <h3>
                {lesson.cheatCode.title}
              </h3>

              <p className="concept-introduction">
                <strong>
                  Remember:
                </strong>{" "}
                {lesson.cheatCode.remember}
              </p>

              <h4>Key Points</h4>

              <ul className="concept-points">

                {lesson.cheatCode.keyPoints.map(
                  (point, index) => (
                    <li key={index}>
                      <span>✓</span>

                      <p>{point}</p>
                    </li>
                  ),
                )}

              </ul>

              <h4>Interview Answer</h4>

              <p className="concept-introduction">
                {lesson.cheatCode.interviewAnswer}
              </p>

              <h4>Keywords</h4>

              <p className="concept-introduction">
                {lesson.cheatCode.keywords.join(" • ")}
              </p>

            </div>
          )}

          {/* LEARNING OUTCOME */}

          {lesson.learningOutcome && (
            <div className="concept-card surface-3d">

              <h3>What You Should Be Able to Do</h3>

              <p className="concept-introduction">
                {lesson.learningOutcome}
              </p>

            </div>
          )}

        </section>
      )}

      {/* ================================================= */}
      {/* VISUAL LEARNING */}
      {/* ================================================= */}

      {visual && (
        <VisualLearning
          topic={topic.title}
          image={visual.image}
          title={visual.title}
          description={visual.description}
        />
      )}

      {/* ================================================= */}
      {/* PROGRAMMING EXAMPLE */}
      {/* ================================================= */}

      {lesson?.programmingExample && (
        <section className="topic-section">

          <div className="section-title">
            <span>02</span>

            <div>
              <h2>See It in Code</h2>

              <p>
                Understand the concept using a simple programming example.
              </p>
            </div>
          </div>

          <div className="code-card surface-3d">

            <div className="code-top">

              <div>
                <span>
                  {lesson.programmingExample.language}
                </span>

                <h3>
                  {lesson.programmingExample.title}
                </h3>
              </div>

              <button
                type="button"
                onClick={() =>
                  navigator.clipboard.writeText(
                    lesson.programmingExample.code,
                  )
                }
              >
                Copy
              </button>

            </div>

            <pre>
              {lesson.programmingExample.code}
            </pre>

          </div>

          {/* CODE EXPLANATION */}

          {lesson.programmingExample.explanation && (
            <div className="concept-card surface-3d">

              <h3>What Does This Code Do?</h3>

              <p className="concept-introduction">
                {lesson.programmingExample.explanation}
              </p>

            </div>
          )}

          {/* STEP-BY-STEP CODE EXPLANATION */}

          {lesson.codeExplanation?.length > 0 && (
            <div className="concept-card surface-3d">

              <h3>Step-by-Step Code Explanation</h3>

              <div className="concept-points">

                {lesson.codeExplanation.map(
                  (step, index) => (
                    <div key={index}>

                      <strong>
                        Step {index + 1}: {step.title}
                      </strong>

                      <p>
                        {step.explanation}
                      </p>

                    </div>
                  ),
                )}

              </div>

            </div>
          )}

        </section>
      )}

      {/* ================================================= */}
      {/* VIDEO */}
      {/* ================================================= */}

      {video && (
        <section className="topic-section">

          <div className="section-title">
            <span>03</span>

            <div>
              <h2>Learn With Video</h2>

              <p>
                Watch the topic explanation on the dedicated video page.
              </p>
            </div>
          </div>

          <div className="video-learning-card surface-3d">

            <div className="video-learning-content">

              <span className="video-label">
                TOPIC VIDEO
              </span>

              <h3>
                {topic.title}
              </h3>

              <p className="video-duration">
                Recommended duration: {video.duration}
              </p>

              {video.description && (
                <p className="video-description-preview">
                  {video.description}
                </p>
              )}

              <button
                type="button"
                className="video-complete-btn"
                onClick={() =>
                  navigate(`/video/${courseId}/${topicId}`)
                }
              >
                {videoCompleted
                  ? "✓ Video Completed — Open Video"
                  : "Watch Video →"}
              </button>

            </div>

          </div>

        </section>
      )}


      {/* ================================================= */}
      {/* PRACTICE */}
      {/* ================================================= */}

      {practiceQuestions.length > 0 && (
        <section className="topic-section">

          <div className="section-title">
            <span>04</span>

            <div>
              <h2>Practice</h2>

              <p>
                Test your understanding of this topic.
              </p>
            </div>
          </div>

          <div className="practice-list">

            {practiceQuestions.map((question, index) => {

              const result =
                selectedAnswers[question.id];

              return (
                <div
                  className="practice-card surface-3d"
                  key={question.id}
                >

                  <span className="practice-number">
                    Question {index + 1}
                  </span>

                  <h3>{question.question}</h3>

                  <div className="practice-options">

                    {question.options.map((option) => {

                      const isSelected =
                        result?.selected === option;

                      const isCorrect =
                        option === question.answer;

                      let optionClass = "";

                      if (result) {

                        if (
                          isSelected &&
                          result.correct
                        ) {
                          optionClass = "correct";
                        } else if (
                          isSelected &&
                          !result.correct
                        ) {
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
                            handleAnswer(
                              question.id,
                              option,
                              question.answer,
                            )
                          }
                        >
                          {option}
                        </button>
                      );
                    })}

                  </div>

                  {result && (
                    <div
                      className={`practice-result ${result.correct
                        ? "correct"
                        : "wrong"
                        }`}
                    >
                      <strong>
                        {result.correct
                          ? "✓ Correct!"
                          : "✗ Incorrect"}
                      </strong>

                      <p>
                        {question.explanation}
                      </p>
                    </div>
                  )}

                </div>
              );
            })}

          </div>

          {/* PRACTICE SCORE */}

          {practiceCompleted && (
            <div className="section-score surface-3d">
              <span>Practice Score</span>

              <strong>
                {practiceScore}%
              </strong>

              <p>
                {correctPracticeCount} of{" "}
                {practiceQuestions.length} correct
              </p>
            </div>
          )}

        </section>
      )}

      {/* ================================================= */}
      {/* INTERVIEW */}
      {/* ================================================= */}

      {interviewQuestions.length > 0 && (
        <section className="topic-section">

          <div className="section-title">
            <span>05</span>

            <div>
              <h2>Interview Questions</h2>

              <p>
                Prepare for real interview questions.
              </p>
            </div>
          </div>

          <div className="interview-list">

            {interviewQuestions.map((item, index) => {

              const isOpen =
                openInterview[item.id];

              const hasViewed =
                viewedInterview[item.id];

              return (
                <div
                  className="interview-card surface-3d"
                  key={item.id}
                >

                  <div className="interview-card-top">

                    <span>
                      Question {index + 1}
                    </span>

                    <strong>
                      {item.difficulty}
                    </strong>

                  </div>

                  <h3>{item.question}</h3>

                  <button
                    className="interview-answer-btn"
                    onClick={() =>
                      toggleInterview(item.id)
                    }
                  >
                    {isOpen
                      ? "Hide Answer ↑"
                      : "Show Answer →"}
                  </button>

                  {hasViewed && (
                    <span className="interview-viewed">
                      ✓ Answer Viewed
                    </span>
                  )}

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

          {interviewCompleted && (
            <div className="section-score surface-3d">
              <span>Interview</span>

              <strong>Completed ✓</strong>

              <p>
                All interview answers have been reviewed.
              </p>
            </div>
          )}

        </section>
      )}

      {/* ================================================= */}
      {/* CODING PROBLEMS */}
      {/* ================================================= */}

      {problems.length > 0 && (
        <section className="topic-section">

          <div className="section-title">
            <span>06</span>

            <div>
              <h2>Coding Problems</h2>

              <p>
                Solve coding problems related to this topic.
              </p>
            </div>
          </div>

          <div className="coding-problems-list">

            {problems.map((problem, index) => (

              <div
                className="coding-problem-card surface-3d"
                key={problem.id}
              >

                <div className="coding-problem-top">

                  <span>
                    Problem {index + 1}
                  </span>

                  <strong>
                    {problem.difficulty}
                  </strong>

                </div>

                <h3>{problem.title}</h3>

                <p>{problem.description}</p>

                <span className="coding-language">
                  {problem.language}
                </span>

                <button
                  className="coding-start-btn"
                  type="button"
                  onClick={() =>
                    navigate(
                      `/coding/${courseId}/${topicId}/${problem.id}`
                    )
                  }
                >
                  Solve Problem →
                </button>

              </div>

            ))}

          </div>

          {/* CODING LOCK */}

          <div className="coding-status surface-3d">

            <strong>
              🔒 Coding Completion Required
            </strong>

            <p>
              Complete the coding problem and pass
              its test cases before the topic can
              be completed.
            </p>

          </div>

        </section>
      )}

      {/* ================================================= */}
      {/* COMPLETION STATUS */}
      {/* ================================================= */}

      <section className="completion-status surface-3d">

        <h2>Topic Completion</h2>

        <div className="completion-checklist">

          <div className={videoCompleted ? "done" : "locked"}>
            <span>
              {videoCompleted ? "✓" : "🔒"}
            </span>
            Video
          </div>

          <div className={practiceCompleted ? "done" : "locked"}>
            <span>
              {practiceCompleted ? "✓" : "🔒"}
            </span>
            Practice
          </div>

          <div className={interviewCompleted ? "done" : "locked"}>
            <span>
              {interviewCompleted ? "✓" : "🔒"}
            </span>
            Interview
          </div>

          <div className={codingCompleted ? "done" : "locked"}>
            <span>
              {codingCompleted ? "✓" : "🔒"}
            </span>
            Coding & Test Cases
          </div>

        </div>

      </section>

      {/* ================================================= */}
      {/* COMPLETE / NAVIGATION */}
      {/* ================================================= */}

      <div className="topic-navigation">

        <button
          onClick={() =>
            navigate(`/course/${courseId}`)
          }
        >
          ← Back to Course
        </button>

        <button
          className="next-topic-btn"
          onClick={markTopicCompleted}
          disabled={!topicCompleted}
        >
          {topicCompleted
            ? nextTopic
              ? "Complete & Continue →"
              : "Complete Course ✓"
            : "🔒 Complete Required Tasks First"}
        </button>

      </div>

    </div>
  );
}

export default TopicPage;