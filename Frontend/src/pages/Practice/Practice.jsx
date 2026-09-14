import { useState } from "react";
import "./Practice.css";

function Practice() {
  const [selectedType, setSelectedType] = useState("MCQ");

  const practiceTypes = [
    {
      id: "MCQ",
      title: "Multiple Choice",
      icon: "🎯",
      description: "Test your concepts with quick questions.",
    },
    {
      id: "Coding",
      title: "Coding Practice",
      icon: "💻",
      description: "Solve coding problems and improve your logic.",
    },
    {
      id: "Quiz",
      title: "Quick Quiz",
      icon: "🧠",
      description: "Challenge yourself with topic-based quizzes.",
    },
  ];

  return (
    <div className="practice-page page-container">

      {/* HEADER */}
      <section className="practice-header">
        <div>
          <span className="practice-label">
            PRACTICE HUB
          </span>

          <h1 className="page-title">
            Practice Makes You Better
          </h1>

          <p className="page-subtitle">
            Test your knowledge, improve your problem-solving
            skills and identify your weak areas.
          </p>
        </div>

        <div className="practice-score surface-3d">
          <span>Your Progress</span>
          <strong>0%</strong>
        </div>
      </section>

      {/* PRACTICE TYPES */}
      <section className="practice-types">

        {practiceTypes.map((type) => (
          <div
            key={type.id}
            className={`practice-type-card surface-3d ${
              selectedType === type.id ? "active" : ""
            }`}
            onClick={() => setSelectedType(type.id)}
          >
            <div className="practice-type-icon">
              {type.icon}
            </div>

            <div>
              <h2>{type.title}</h2>

              <p>{type.description}</p>
            </div>

            <span className="practice-arrow">
              →
            </span>
          </div>
        ))}

      </section>

      {/* CURRENT PRACTICE */}
      <section className="practice-workspace surface-3d">

        <div className="workspace-header">
          <div>
            <span className="section-number">
              {selectedType.toUpperCase()}
            </span>

            <h2>
              Start Practicing
            </h2>

            <p>
              Select a topic and begin your practice session.
            </p>
          </div>

          <div className="practice-badge">
            🤖 AI Assisted
          </div>
        </div>

        <div className="practice-options">

          <button className="practice-topic">
            <span>☕</span>
            <div>
              <strong>Java</strong>
              <small>Core Java & OOP</small>
            </div>
            <b>→</b>
          </button>

          <button className="practice-topic">
            <span>🧩</span>
            <div>
              <strong>DSA</strong>
              <small>Algorithms & Data Structures</small>
            </div>
            <b>→</b>
          </button>

          <button className="practice-topic">
            <span>⚛️</span>
            <div>
              <strong>React</strong>
              <small>Components & Frontend</small>
            </div>
            <b>→</b>
          </button>

          <button className="practice-topic">
            <span>☁️</span>
            <div>
              <strong>AWS</strong>
              <small>Cloud & Services</small>
            </div>
            <b>→</b>
          </button>

        </div>

      </section>

    </div>
  );
}

export default Practice;