import React, { useState } from 'react';

const VideoDownloader = () => {
  const [videoLink, setVideoLink] = useState('');
  const [videoQuality, setVideoQuality] = useState('720p');

  const handleLinkChange = (event) => {
    setVideoLink(event.target.value);
  };

  const handleQualityChange = (event) => {
    setVideoQuality(event.target.value);
  };

  const handleDownload = () => {
    // Remove any whitespace from the video link
    const cleanLink = videoLink.trim();
  
    // Extract the video ID from the YouTube link
    const videoIdMatch = cleanLink.match(/(?<=v=|v\/|vi=|vi\/|youtu.be\/|embed\/|\/v\/|\/e\/|\/u\/\w\/|embed\/|youtu.be\/|v=|e\/|u\/\w\/|watch\?v=|youtube.com\/user\/\w+\/|youtube.com\/v\/)\w+/);
    if (!videoIdMatch) {
      console.error('Invalid YouTube video link');
      return;
    }
    const videoId = videoIdMatch[0];
  
    // Construct the download URL based on the video ID and quality
    const downloadUrl = `https://www.youtube.com/watch?v=${videoId}&q=${videoQuality}`;
  
    // Create a temporary link element
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.target = '_blank';
    link.download = `video_${videoId}_${videoQuality}.mp4`;
  
    // Programmatically click the link to initiate the download
    document.body.appendChild(link);
    link.click();
  
    // Clean up the temporary link element
    document.body.removeChild(link);
  };
  
  

  return (
    <div>
      <input
        type="text"
        value={videoLink}
        onChange={handleLinkChange}
        placeholder="Paste YouTube video link"
      />
      <select value={videoQuality} onChange={handleQualityChange}>
        <option value="240p">240p</option>
        <option value="360p">360p</option>
        <option value="480p">480p</option>
        <option value="720p">720p</option>
        <option value="1080p">1080p</option>
      </select>
      <button onClick={handleDownload}>Download</button>
    </div>
  );
};

export default VideoDownloader;
