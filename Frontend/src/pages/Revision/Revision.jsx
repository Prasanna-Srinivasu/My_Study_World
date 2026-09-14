import { useState } from "react";
import "./Revision.css";

function Revision() {
  const [selectedTopic, setSelectedTopic] = useState("Java");

  const topics = [
    {
      name: "Java",
      icon: "☕",
      description: "Core Java concepts and OOP",
    },
    {
      name: "DSA",
      icon: "🧩",
      description: "Algorithms and data structures",
    },
    {
      name: "React",
      icon: "⚛️",
      description: "React fundamentals and concepts",
    },
    {
      name: "AWS",
      icon: "☁️",
      description: "Cloud and AWS fundamentals",
    },
    {
      name: "SQL",
      icon: "🗄️",
      description: "Database and SQL concepts",
    },
  ];

  return (
    <div className="revision-page page-container">

      {/* HEADER */}

      <section className="revision-header">
        <div>
          <span className="revision-label">
            REVISION CENTER
          </span>

          <h1 className="page-title">
            Revise Smarter, Not Harder
          </h1>

          <p className="page-subtitle">
            Quickly revisit important concepts and strengthen
            what you've already learned.
          </p>
        </div>

        <div className="revision-summary surface-3d">
          <span>Topics to Revise</span>
          <strong>0</strong>
        </div>
      </section>

      {/* REVISION OPTIONS */}

      <section className="revision-layout">

        <aside className="revision-sidebar surface-3d">

          <span className="section-number">
            SUBJECTS
          </span>

          <h2>
            Choose a Topic
          </h2>

          <div className="revision-topic-list">

            {topics.map((topic) => (
              <button
                key={topic.name}
                className={
                  selectedTopic === topic.name
                    ? "revision-topic active"
                    : "revision-topic"
                }
                onClick={() =>
                  setSelectedTopic(topic.name)
                }
              >
                <span className="revision-topic-icon">
                  {topic.icon}
                </span>

                <span className="revision-topic-text">
                  <strong>{topic.name}</strong>
                  <small>{topic.description}</small>
                </span>

                <b>→</b>
              </button>
            ))}

          </div>

        </aside>

        {/* MAIN */}

        <main className="revision-main">

          <section className="revision-hero-card surface-3d">

            <div className="revision-hero-icon">
              🧠
            </div>

            <div>
              <span className="section-number">
                ACTIVE REVISION
              </span>

              <h2>
                {selectedTopic} Revision
              </h2>

              <p>
                Your important concepts will appear here as
                you complete lessons.
              </p>
            </div>

          </section>

          {/* QUICK REVISION */}

          <section className="quick-revision surface-3d">

            <div className="revision-section-heading">
              <div>
                <span className="section-number">
                  01
                </span>

                <h2>
                  Quick Revision
                </h2>
              </div>

              <span className="revision-count">
                0 Cards
              </span>
            </div>

            <div className="empty-revision">

              <div className="empty-revision-icon">
                📖
              </div>

              <h3>
                Nothing to revise yet
              </h3>

              <p>
                Complete lessons and important concepts will
                automatically become available here for revision.
              </p>

            </div>

          </section>

          {/* AI REVISION */}

          <section className="ai-revision surface-3d">

            <div className="ai-revision-icon">
              🤖
            </div>

            <div className="ai-revision-content">

              <span className="section-number">
                AI REVISION COACH
              </span>

              <h2>
                Let AI find your weak areas
              </h2>

              <p>
                The AI will eventually analyze your practice,
                interview answers and learning progress to
                create personalized revision sessions.
              </p>

              <div className="revision-features">

                <span>🎯 Weak topics</span>
                <span>🔄 Spaced revision</span>
                <span>🧠 Smart questions</span>
                <span>📊 Progress tracking</span>

              </div>

              <button className="start-revision-button">
                Start AI Revision →
              </button>

            </div>

          </section>

        </main>

      </section>

    </div>
  );
}

export default Revision;