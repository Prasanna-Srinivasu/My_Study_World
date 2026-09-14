import "./Navbar.css";

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-logo">
        <span className="logo-icon">MS</span>

        <div>
          <h2>My Study World</h2>
          <span>Learn. Practice. Build.</span>
        </div>
      </div>

      <div className="navbar-right">
        <button className="notification-btn">🔔</button>

        <div className="profile-mini">
          <div className="profile-avatar">S</div>

          <div className="profile-info">
            <strong>Student</strong>
            <span>Developer Journey</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;