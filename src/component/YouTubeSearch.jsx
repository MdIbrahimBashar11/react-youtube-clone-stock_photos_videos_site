import React, { useState } from 'react';
import axios from 'axios';

const VideoSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [downloadQuality, setDownloadQuality] = useState('');
  const [downloadProgress, setDownloadProgress] = useState(0);

  const handleSearch = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.get(
        'https://www.googleapis.com/youtube/v3/search',
        {
          params: {
            q: searchTerm,
            part: 'snippet',
            maxResults: 32,
            type: 'video',
            key: 'AIzaSyCdojvkXeJoPSxYwFRFXXuibSHJJxS4wpU',
          },
        }
      );

      setVideos(response.data.items);
    } catch (error) {
      console.error('Error searching videos:', error);
    }
  };

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
    setDownloadQuality('');
  };

  const handleQualitySelect = (event) => {
    setDownloadQuality(event.target.value);
  };

  const handleDownload = () => {
    const selectedVideoId = selectedVideo.id.videoId;
    const quality = downloadQuality || 'default';

    const downloadUrl = `https://www.youtube.com/${selectedVideo}?videoId=${selectedVideoId}&quality=${quality}`;
    window.open(downloadUrl);
  };

  return (
    <div className="container">
      <h1 className="text-center my-4">YouTube Video Search</h1>
      <form onSubmit={handleSearch}>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search videos..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
          <button className="btn btn-primary" type="submit">
            Search
          </button>
        </div>
      </form>
      <div className="row">
        <div className="col">
          {selectedVideo && (
            <div>
              <iframe
                id="youtube-iframe"
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${selectedVideo.id.videoId}`}
                frameBorder="0"
                allowFullScreen
              ></iframe>
              <div className="mt-3">
                <label>Select Quality:</label>
                <select
                  className="form-select"
                  value={downloadQuality}
                  onChange={handleQualitySelect}
                >
                  <option value="">Select quality</option>
                  <option value="240">240p</option>
                  <option value="360">360p</option>
                  <option value="720">720p</option>
                  <option value="1080">1080p</option>
                  <option value="4k">4K</option>
                </select>
                {downloadQuality && (
                  <button
                    className="btn btn-primary mt-2"
                    onClick={handleDownload}
                  >
                    Download
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="row">
        {videos.map((video) => (
          <div className="col-sm-3" key={video.id.videoId}>
            <div className="card mb-3">
              <img
                src={video.snippet.thumbnails.medium.url}
                alt={video.snippet.title}
                className="card-img-top"
                style={{ cursor: 'pointer' }}
                onClick={() => handleVideoClick(video)}
              />
              <div className="card-body">
                <h5 className="card-title">{video.snippet.title}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoSearch;
