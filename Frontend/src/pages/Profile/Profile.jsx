import "./Profile.css";

function Profile() {
  return (
    <div className="profile-page page-container">

      <section className="profile-hero surface-3d">
        <div className="profile-avatar">
          👨‍💻
        </div>

        <div className="profile-info">
          <span className="profile-label">
            MY PROFILE
          </span>

          <h1 className="page-title">
            Welcome, Learner 👋
          </h1>

          <p className="page-subtitle">
            Your learning journey, achievements and personal
            progress in one place.
          </p>
        </div>

        <button className="edit-profile-button">
          ✏️ Edit Profile
        </button>
      </section>

      <section className="profile-stats">

        <div className="profile-stat surface-3d">
          <span>📚</span>
          <strong>0</strong>
          <p>Courses Completed</p>
        </div>

        <div className="profile-stat surface-3d">
          <span>🔥</span>
          <strong>0</strong>
          <p>Day Streak</p>
        </div>

        <div className="profile-stat surface-3d">
          <span>🎯</span>
          <strong>0%</strong>
          <p>Overall Progress</p>
        </div>

        <div className="profile-stat surface-3d">
          <span>🏆</span>
          <strong>0</strong>
          <p>Achievements</p>
        </div>

      </section>

      <section className="profile-content">

        <div className="profile-section surface-3d">
          <span className="section-number">
            LEARNING
          </span>

          <h2>
            My Learning Journey
          </h2>

          <div className="learning-row">
            <div className="learning-icon">☕</div>

            <div className="learning-details">
              <strong>Java</strong>
              <span>Begin your Java journey</span>

              <div className="learning-progress">
                <div></div>
              </div>
            </div>

            <b>0%</b>
          </div>

          <div className="learning-row">
            <div className="learning-icon">🧩</div>

            <div className="learning-details">
              <strong>Data Structures & Algorithms</strong>
              <span>Build strong problem-solving skills</span>

              <div className="learning-progress">
                <div></div>
              </div>
            </div>

            <b>0%</b>
          </div>

          <div className="learning-row">
            <div className="learning-icon">⚛️</div>

            <div className="learning-details">
              <strong>React</strong>
              <span>Build modern web applications</span>

              <div className="learning-progress">
                <div></div>
              </div>
            </div>

            <b>0%</b>
          </div>

        </div>

        <div className="profile-section surface-3d">

          <span className="section-number">
            ACHIEVEMENTS
          </span>

          <h2>
            Your Achievements
          </h2>

          <div className="achievement-grid">

            <div className="achievement locked">
              <span>🏅</span>
              <strong>First Lesson</strong>
              <small>Complete your first lesson</small>
            </div>

            <div className="achievement locked">
              <span>🔥</span>
              <strong>7 Day Streak</strong>
              <small>Learn for 7 consecutive days</small>
            </div>

            <div className="achievement locked">
              <span>💻</span>
              <strong>Code Warrior</strong>
              <small>Solve 25 coding problems</small>
            </div>

            <div className="achievement locked">
              <span>🎤</span>
              <strong>Interview Ready</strong>
              <small>Complete an AI interview</small>
            </div>

          </div>

        </div>

      </section>

    </div>
  );
}

export default Profile;