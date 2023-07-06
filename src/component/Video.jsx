import React, { useState } from 'react';
import axios from 'axios';
import './style/video.css';

const Video = () => {
  const [query, setQuery] = useState('');
  const [videos, setVideos] = useState([]);
  const [downloadProgress, setDownloadProgress] = useState(0);

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(
        `https://api.pexels.com/videos/search?query=${encodeURIComponent(query)}&per_page=6`,
        {
          headers: {
            Authorization: 'botalDQJJlaYdf7vzYYcVyM3b1ZU6UGZJSh7Ze3oGOqrO50He4iwnH39', // Replace with your Pexels API key
          },
        }
      );

      setVideos(response.data.videos);
    } catch (error) {
      console.error('Error searching videos:', error);
    }
  };

  const handleDownload = async (url) => {
    try {
      const response = await axios({
        url,
        method: 'GET',
        responseType: 'blob',
        headers: {
          Authorization: 'botalDQJJlaYdf7vzYYcVyM3b1ZU6UGZJSh7Ze3oGOqrO50He4iwnH39', // Replace with your Pexels API key
        },
        onDownloadProgress: (progressEvent) => {
          const progress = Math.round(
            (progressEvent.loaded / progressEvent.total) * 100
          );
          setDownloadProgress(progress);
        },
      });

      const urlObj = window.URL || window.webkitURL;
      const objectUrl = urlObj.createObjectURL(response.data);

      const link = document.createElement('a');
      link.href = objectUrl;
      link.download = 'video.mp4';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      urlObj.revokeObjectURL(objectUrl);
      setDownloadProgress(0);
    } catch (error) {
      console.error('Error downloading video:', error);
    }
  };

  const handleCopy = (url) => {
    navigator.clipboard.writeText(url);
    alert('URL copied to clipboard!');
  };

  return (
    <div className="container">
      <h1 className="text-center my-4">Video Search</h1>
      <form onSubmit={handleSearch}>
        <div className="input-group mb-2">
          <input
            type="text"
            value={query}
            className="form-control"
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter search query"
          />
          <button className="btn btn-primary" type="submit">
            Search
          </button>
        </div>
      </form>
      <div className="video-container">
        {videos.map((video) => (
          <div key={video.id} className="video-card">
            <video controls>
              <source src={video.video_files[0].link} type="video/mp4" />
            </video>
            <div className="button-container">
              <button onClick={() => handleDownload(video.video_files[0].link)}>
                Download
              </button>
              <button onClick={() => handleCopy(video.video_files[0].link)}>
                Copy URL
              </button>
            </div>
          </div>
        ))}
      </div>
      {downloadProgress > 0 && (
        <div className="progress-bar">
          <div
            className="progress"
            style={{ width: `${downloadProgress}%` }}
          ></div>
        </div>
      )}
    </div>
  );
};

export default Video;
