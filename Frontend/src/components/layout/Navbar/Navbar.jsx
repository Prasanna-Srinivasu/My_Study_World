import { NavLink } from "react-router-dom";
import { Bell } from "lucide-react";

import "./Navbar.css";

function Navbar() {
  const navItems = [
    { label: "Home", path: "/" },
    { label: "Learn", path: "/learn" },
    { label: "Practice", path: "/practice" },
    { label: "Projects", path: "/projects" },
  ];

  return (
    <header className="navbar">
      {/* Brand */}
      <NavLink to="/" className="navbar-logo">
        <span className="logo-icon">MS</span>

        <div className="navbar-brand-text">
          <h2>My Study World</h2>
          <span>Learn. Practice. Build.</span>
        </div>
      </NavLink>

      {/* Main Navigation */}
      <nav
        className="navbar-links"
        aria-label="Main navigation"
      >
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/"}
            className={({ isActive }) =>
              `navbar-link ${isActive ? "active" : ""}`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* Right Side */}
      <div className="navbar-right">
        <button
          className="notification-btn"
          type="button"
          aria-label="Notifications"
        >
          <Bell
            size={18}
            strokeWidth={2}
          />
        </button>

        <NavLink
          to="/profile"
          className="profile-mini"
        >
          <div className="profile-avatar">
            S
          </div>

          <div className="profile-info">
            <strong>Student</strong>
            <span>Developer Journey</span>
          </div>
        </NavLink>
      </div>
    </header>
  );
}

export default Navbar;