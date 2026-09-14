import "./YouTubeVideo.css";

function YouTubeVideo({ topicTitle }) {
  const searchText = `Java ${topicTitle} tutorial interview questions 20 minutes`;

  const youtubeUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(
    searchText
  )}`;

  return (
    <div className="youtube-video-card">
      <div className="youtube-icon">▶</div>

      <div className="youtube-content">
        <span>LEARN WITH VIDEO</span>
        <h3>{topicTitle}</h3>
        <p>
          Watch a topic-specific YouTube explanation before
          starting the questions and practice.
        </p>
      </div>

      <a
        href={youtubeUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="youtube-button"
      >
        Watch on YouTube →
      </a>
    </div>
  );
}

export default YouTubeVideo;