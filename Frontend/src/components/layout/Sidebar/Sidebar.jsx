import "./Sidebar.css";

function Sidebar() {
  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        <a href="/" className="sidebar-item active">
          <span>⌂</span>
          <p>Home</p>
        </a>

        <a href="/learn" className="sidebar-item">
          <span>📚</span>
          <p>Learn</p>
        </a>

        <a href="/practice" className="sidebar-item">
          <span>💻</span>
          <p>Practice</p>
        </a>

        <a href="/interview" className="sidebar-item">
          <span>🎤</span>
          <p>Interview</p>
        </a>

        <a href="/revision" className="sidebar-item">
          <span>🔄</span>
          <p>Revision</p>
        </a>

        <a href="/projects" className="sidebar-item">
          <span>🚀</span>
          <p>Projects</p>
        </a>

        <a href="/progress" className="sidebar-item">
          <span>📊</span>
          <p>Progress</p>
        </a>

        <a href="/profile" className="sidebar-item">
          <span>👤</span>
          <p>Profile</p>
        </a>
      </nav>
    </aside>
  );
}

export default Sidebar;