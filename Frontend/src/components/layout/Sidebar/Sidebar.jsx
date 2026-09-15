import { NavLink } from "react-router-dom";
import {
  House,
  BookOpen,
  Code2,
  Mic2,
  RefreshCw,
  Rocket,
  ChartNoAxesCombined,
  UserRound,
} from "lucide-react";

import "./Sidebar.css";

function Sidebar() {
  const items = [
    { label: "Home", path: "/", icon: House },
    { label: "Learn", path: "/learn", icon: BookOpen },
    { label: "Practice", path: "/practice", icon: Code2 },
    { label: "Interview", path: "/interview", icon: Mic2 },
    { label: "Revision", path: "/revision", icon: RefreshCw },
    { label: "Projects", path: "/projects", icon: Rocket },
    { label: "Progress", path: "/progress", icon: ChartNoAxesCombined },
    { label: "Profile", path: "/profile", icon: UserRound },
  ];

  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                `sidebar-item ${isActive ? "active" : ""}`
              }
            >
              <span className="sidebar-icon">
                <Icon size={19} strokeWidth={2} />
              </span>

              <p>{item.label}</p>
            </NavLink>
          );
        })}
      </nav>

      <div className="sidebar-bottom">
        <div className="sidebar-tip">
          <span>✦</span>
          <div>
            <strong>Keep learning</strong>
            <small>Small steps every day.</small>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;