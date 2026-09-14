import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Navbar from "./components/layout/Navbar/Navbar.jsx";
import Sidebar from "./components/layout/Sidebar/Sidebar.jsx";
import Login from "./pages/Login/Login";

import Home from "./pages/Home/Home.jsx";
import Learn from "./pages/Learn/Learn.jsx";
import CoursePage from "./pages/Course/CoursePage.jsx";
import TopicPage from "./pages/Topic/TopicPage.jsx";

import Practice from "./pages/Practice/Practice.jsx";
import Interview from "./pages/Interview/Interview.jsx";
import Revision from "./pages/Revision/Revision.jsx";
import Projects from "./pages/Projects/Projects.jsx";
import Progress from "./pages/Progress/Progress.jsx";
import Profile from "./pages/Profile/Profile.jsx";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <Sidebar />

        <main className="app-content">
          <Routes>
            {/* Main pages */}
            <Route path="/" element={<Home />} />
            <Route path="/learn" element={<Learn />} />

            {/* Course */}
            <Route path="/course/:courseId" element={<CoursePage />} />

            {/* Topic */}
            <Route
              path="/topic/:courseId/:topicId"
              element={<TopicPage />}
            />
            <Route path="/login" element={<Login />} />

            {/* Other sections */}
            <Route path="/practice" element={<Practice />} />
            <Route path="/interview" element={<Interview />} />
            <Route path="/revision" element={<Revision />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="/profile" element={<Profile />} />

            {/* Unknown route */}
            <Route
              path="*"
              element={
                <div className="page-container">
                  <h1 className="page-title">Page Not Found</h1>
                  <p className="page-subtitle">
                    The page you are looking for does not exist.
                  </p>
                </div>
              }
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;