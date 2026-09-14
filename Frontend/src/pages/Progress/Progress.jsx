import "./Progress.css";

function Progress() {
  return (
    <div className="progress-page page-container">

      <section className="progress-header">
        <div>
          <span className="progress-label">MY PROGRESS</span>

          <h1 className="page-title">
            Track Your Learning
          </h1>

          <p className="page-subtitle">
            See how far you've come and what you should focus on next.
          </p>
        </div>

        <div className="overall-progress-card surface-3d">
          <div className="progress-circle">
            <strong>0%</strong>
          </div>

          <span>Overall Progress</span>
        </div>
      </section>

      {/* SUMMARY */}

      <section className="progress-summary">

        <div className="progress-stat surface-3d">
          <span>📚</span>
          <strong>0</strong>
          <p>Lessons Completed</p>
        </div>

        <div className="progress-stat surface-3d">
          <span>🧠</span>
          <strong>0</strong>
          <p>Questions Solved</p>
        </div>

        <div className="progress-stat surface-3d">
          <span>🎤</span>
          <strong>0</strong>
          <p>Interviews Completed</p>
        </div>

        <div className="progress-stat surface-3d">
          <span>🔥</span>
          <strong>0</strong>
          <p>Day Streak</p>
        </div>

      </section>

      {/* COURSE PROGRESS */}

      <section className="course-progress-section surface-3d">

        <div className="section-heading">
          <div>
            <span className="section-number">
              01
            </span>

            <h2>
              Course Progress
            </h2>
          </div>

          <p>
            Keep learning consistently to complete your courses.
          </p>
        </div>

        <div className="course-progress-list">

          <div className="course-progress-row">
            <div className="course-icon">☕</div>

            <div className="course-progress-info">
              <div className="course-progress-title">
                <strong>Java</strong>
                <span>0%</span>
              </div>

              <div className="progress-track">
                <div className="progress-fill"></div>
              </div>

              <small>
                Start learning Java fundamentals
              </small>
            </div>
          </div>

          <div className="course-progress-row">
            <div className="course-icon">🧩</div>

            <div className="course-progress-info">
              <div className="course-progress-title">
                <strong>Data Structures & Algorithms</strong>
                <span>0%</span>
              </div>

              <div className="progress-track">
                <div className="progress-fill"></div>
              </div>

              <small>
                Build your problem-solving skills
              </small>
            </div>
          </div>

          <div className="course-progress-row">
            <div className="course-icon">☁️</div>

            <div className="course-progress-info">
              <div className="course-progress-title">
                <strong>AWS</strong>
                <span>0%</span>
              </div>

              <div className="progress-track">
                <div className="progress-fill"></div>
              </div>

              <small>
                Learn cloud computing fundamentals
              </small>
            </div>
          </div>

          <div className="course-progress-row">
            <div className="course-icon">⚛️</div>

            <div className="course-progress-info">
              <div className="course-progress-title">
                <strong>React</strong>
                <span>0%</span>
              </div>

              <div className="progress-track">
                <div className="progress-fill"></div>
              </div>

              <small>
                Build modern React applications
              </small>
            </div>
          </div>

          <div className="course-progress-row">
            <div className="course-icon">🗄️</div>

            <div className="course-progress-info">
              <div className="course-progress-title">
                <strong>SQL</strong>
                <span>0%</span>
              </div>

              <div className="progress-track">
                <div className="progress-fill"></div>
              </div>

              <small>
                Master databases and SQL queries
              </small>
            </div>
          </div>

        </div>

      </section>

      {/* NEXT GOAL */}

      <section className="next-goal surface-3d">

        <div className="goal-icon">
          🎯
        </div>

        <div className="goal-content">
          <span className="section-number">
            NEXT GOAL
          </span>

          <h2>
            Complete Your First Lesson
          </h2>

          <p>
            Start with any course and complete your first topic.
            Your progress will be tracked automatically.
          </p>
        </div>

        <button className="goal-button">
          Start Learning →
        </button>

      </section>

    </div>
  );
}

export default Progress;