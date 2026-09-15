import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { topics } from "../../data/topics";
import { videos } from "../../data/videos";

import "./VideoPage.css";

function VideoPage() {
  const { courseId, topicId } = useParams();
  const navigate = useNavigate();

  const [videoCompleted, setVideoCompleted] = useState(false);
  const [videoDescription, setVideoDescription] = useState("");
  const [descriptionLoading, setDescriptionLoading] =
    useState(false);

  const topic = topics.find(
    (item) =>
      String(item.id) === String(topicId) &&
      String(item.courseId) === String(courseId)
  );

  const video = videos[topicId];

  useEffect(() => {
    const savedVideoProgress = JSON.parse(
      localStorage.getItem("videoProgress") || "{}"
    );

    const completed =
      savedVideoProgress[courseId]?.[topicId] === true;

    setVideoCompleted(completed);
  }, [courseId, topicId]);

  useEffect(() => {
    if (!video?.videoUrl) {
      setVideoDescription("");
      return;
    }

    const generateDescription = async () => {
      try {
        setDescriptionLoading(true);

        const response = await fetch(
          "http://localhost:8080/api/video/description",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              videoUrl: video.videoUrl,
            }),
          }
        );

        const data = await response.json();

        if (data.success) {
          setVideoDescription(
            data.description || data.message || ""
          );
        }
      } catch (error) {
        console.error(
          "Video description error:",
          error
        );
      } finally {
        setDescriptionLoading(false);
      }
    };

    generateDescription();
  }, [video]);

  const markVideoComplete = () => {
    const savedVideoProgress = JSON.parse(
      localStorage.getItem("videoProgress") || "{}"
    );

    if (!savedVideoProgress[courseId]) {
      savedVideoProgress[courseId] = {};
    }

    savedVideoProgress[courseId][topicId] = true;

    localStorage.setItem(
      "videoProgress",
      JSON.stringify(savedVideoProgress)
    );

    setVideoCompleted(true);
  };

  if (!topic || !video) {
    return (
      <main className="video-page">
        <div className="video-container">
          <section className="video-error surface-3d">
            <span className="video-error-label">
              MY STUDY WORLD
            </span>

            <h1>Video Not Found</h1>

            <p>
              The requested video could not be found.
            </p>

            <button
              type="button"
              className="video-back-btn"
              onClick={() =>
                navigate(
                  `/topic/${courseId}/${topicId}`
                )
              }
            >
              <span aria-hidden="true">←</span>
              Back to Topic
            </button>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="video-page">
      <div className="video-container">

        <header className="video-page-header">

          <button
            type="button"
            className="video-back-btn"
            onClick={() =>
              navigate(
                `/topic/${courseId}/${topicId}`
              )
            }
          >
            <span aria-hidden="true">←</span>
            Back to Topic
          </button>

          <span className="video-topic-badge">
            TOPIC VIDEO
          </span>

          <h1>{topic.title}</h1>

          <p>
            Watch the explanation, understand the concept,
            and then continue to practice.
          </p>

        </header>

        <section className="video-page-card surface-3d">

          <div className="video-page-player-wrapper">

            {video.videoUrl ? (
              <div className="video-page-player">
                <iframe
                  src={video.videoUrl}
                  title={`${topic.title} video`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            ) : (
              <div className="video-page-coming-soon">
                <div className="video-play-icon">
                  ▶
                </div>

                <span>
                  VIDEO LESSON
                </span>

                <h2>
                  Video Coming Soon
                </h2>

                <p>
                  The video for this topic has not been
                  added yet.
                </p>
              </div>
            )}

          </div>

          <div className="video-page-information">

            <div>
              <span className="video-label">
                LEARN WITH VIDEO
              </span>

              <h2>{topic.title}</h2>

              <p className="video-duration">
                Recommended duration:{" "}
                <strong>{video.duration}</strong>
              </p>
            </div>

            <div className="video-information-mark">
              {videoCompleted ? "✓" : "01"}
            </div>

          </div>

          <div className="video-page-description">

            <div className="video-description-heading">
              <span className="video-description-icon">
                📖
              </span>

              <div>
                <span>QUICK EXPLANATION</span>
                <h2>Video Description</h2>
              </div>
            </div>

            <div className="video-description-body">
              {descriptionLoading ? (
                <div className="video-description-loading">
                  <span className="video-loading-dot" />
                  <p>
                    Generating a beginner-friendly
                    description...
                  </p>
                </div>
              ) : videoDescription ? (
                <p>{videoDescription}</p>
              ) : (
                <p>
                  Video description is not available yet.
                </p>
              )}
            </div>

          </div>

          <div className="video-page-completion">

            {videoCompleted ? (
              <div className="video-completion-row">

                <div className="video-completed-message">
                  <span>✓</span>
                  Video Completed
                </div>

                <button
                  type="button"
                  className="video-continue-btn"
                  onClick={() =>
                    navigate(
                      `/topic/${courseId}/${topicId}#practice`
                    )
                  }
                >
                  Continue to Practice
                  <span aria-hidden="true">
                    →
                  </span>
                </button>

              </div>
            ) : (
              <div className="video-completion-row">

                <div className="video-completion-hint">
                  Finished watching?
                </div>

                <button
                  type="button"
                  className="video-complete-btn"
                  onClick={markVideoComplete}
                >
                  Mark Video Complete
                  <span aria-hidden="true">
                    ✓
                  </span>
                </button>

              </div>
            )}

          </div>

        </section>

        <footer className="video-page-footer">
          <span>
            LEARN • PRACTICE • BUILD
          </span>

          <p>
            Take your time. Understand the concept.
            Then put it into practice.
          </p>
        </footer>

      </div>
    </main>
  );
}

export default VideoPage;