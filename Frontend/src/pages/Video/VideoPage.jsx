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
    const [descriptionLoading, setDescriptionLoading] = useState(false);
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
        useEffect(() => {
            if (!video?.videoUrl) return;

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
                        setVideoDescription(data.description || data.message || "");
                    }
                } catch (error) {
                    console.error("Video description error:", error);
                } finally {
                    setDescriptionLoading(false);
                }
            };

            generateDescription();
        }, [video]);

        const completed =
            savedVideoProgress[courseId]?.[topicId] === true;

        setVideoCompleted(completed);
    }, [courseId, topicId]);

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
            <div className="video-page">
                <div className="video-error">
                    <h1>Video Not Found</h1>

                    <p>
                        The requested video could not be found.
                    </p>

                    <button
                        onClick={() =>
                            navigate(`/topic/${courseId}/${topicId}`)
                        }
                    >
                        ← Back to Topic
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="video-page">

            {/* HEADER */}

            <div className="video-page-header">

                <button
                    className="video-back-btn"
                    onClick={() =>
                        navigate(`/topic/${courseId}/${topicId}`)
                    }
                >
                    ← Back to Topic
                </button>

                <span className="video-topic-badge">
                    TOPIC VIDEO
                </span>

                <h1>{topic.title}</h1>

                <p>
                    Watch the complete explanation before continuing
                    to the next learning section.
                </p>

            </div>

            {/* VIDEO */}

            <section className="video-page-card">

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

                        <h2>Video Coming Soon</h2>

                        <p>
                            The video for this topic has not been added yet.
                        </p>

                    </div>
                )}

                {/* VIDEO INFORMATION */}

                <div className="video-page-information">

                    <span className="video-label">
                        LEARN WITH VIDEO
                    </span>

                    <h2>{topic.title}</h2>

                    <p className="video-duration">
                        Recommended duration: {video.duration}
                    </p>

                </div>

                {/* DESCRIPTION */}

                <div className="video-page-description">
                    <h2>📖 Video Description</h2>

                    {descriptionLoading ? (
                        <p>Generating beginner-friendly description...</p>
                    ) : videoDescription ? (
                        <div>{videoDescription}</div>
                    ) : (
                        <p>Video description is not available yet.</p>
                    )}
                </div>

                {/* COMPLETION */}

                <div className="video-page-completion">

                    {videoCompleted ? (
                        <>
                            <div className="video-completed-message">
                                ✓ Video Completed
                            </div>

                            <button
                                className="video-continue-btn"
                                onClick={() =>
                                    navigate(`/topic/${courseId}/${topicId}#practice`)
                                }
                            >
                                Continue to Practice →
                            </button>
                        </>
                    ) : (
                        <button
                            className="video-complete-btn"
                            onClick={markVideoComplete}
                        >
                            Mark Video Complete ✓
                        </button>
                    )}

                </div>

            </section>

        </div>
    );
}

export default VideoPage;