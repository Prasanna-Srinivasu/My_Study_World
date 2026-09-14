import { useState } from "react";
import "./Projects.css";
import { projects } from "../../data/projects.js";

function Projects() {
  const [selectedLevel, setSelectedLevel] = useState("All");

  const levels = ["All", "Beginner", "Intermediate", "Advanced"];

  const filteredProjects =
    selectedLevel === "All"
      ? projects
      : projects.filter((project) => project.level === selectedLevel);

  return (
    <div className="projects-page page-container">

      {/* HEADER */}
      <section className="projects-header">
        <div>
          <span className="projects-label">
            PROJECT LAB
          </span>

          <h1 className="page-title">
            Build Real Projects
          </h1>

          <p className="page-subtitle">
            Turn what you learn into real applications and
            build a portfolio you can be proud of.
          </p>
        </div>

        <div className="project-summary surface-3d">
          <strong>{projects.length}</strong>
          <span>Projects</span>
        </div>
      </section>

      {/* FILTER */}
      <section className="project-filter surface-3d">
        <span className="filter-title">
          FILTER BY LEVEL
        </span>

        <div className="filter-buttons">
          {levels.map((level) => (
            <button
              key={level}
              className={
                selectedLevel === level
                  ? "filter-button active"
                  : "filter-button"
              }
              onClick={() => setSelectedLevel(level)}
            >
              {level}
            </button>
          ))}
        </div>
      </section>

      {/* PROJECT GRID */}
      <section className="projects-grid">
        {filteredProjects.map((project) => (
          <article
            className="project-card surface-3d"
            key={project.title}
          >
            <div className="project-card-top">
              <div className="project-icon">
                {project.icon}
              </div>

              <span className="project-level">
                {project.level}
              </span>
            </div>

            <span className="project-category">
              {project.category}
            </span>

            <h2>
              {project.title}
            </h2>

            <p>
              {project.description}
            </p>

            <div className="project-skills">
              {project.skills.map((skill) => (
                <span key={skill}>
                  {skill}
                </span>
              ))}
            </div>

            <button className="project-start-button">
              View Project →
            </button>
          </article>
        ))}
      </section>

      {/* CUSTOM PROJECT */}
      <section className="custom-project surface-3d">
        <div className="custom-project-icon">
          💡
        </div>

        <div className="custom-project-content">
          <span className="section-number">
            BUILD SOMETHING YOURSELF
          </span>

          <h2>
            Have your own project idea?
          </h2>

          <p>
            Eventually, your AI mentor can help turn your idea
            into a real project — from planning to implementation.
          </p>
        </div>

        <button className="idea-button">
          Start My Idea →
        </button>
      </section>

    </div>
  );
}

export default Projects;