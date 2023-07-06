import React, { useState } from 'react';
import './style/image.css';

const Image = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `https://api.pexels.com/v1/search?query=${encodeURIComponent(
          query
        )}&per_page=30`,
        {
          headers: {
            Authorization: 'botalDQJJlaYdf7vzYYcVyM3b1ZU6UGZJSh7Ze3oGOqrO50He4iwnH39',
          },
        }
      );

      const data = await response.json();
      setImages(data.photos);
    } catch (error) {
      console.error('Error searching images:', error);
    }
  };

  const handleDownload = async (url) => {
    try {
      const response = await fetch(url, {
        headers: {
          Authorization: 'botalDQJJlaYdf7vzYYcVyM3b1ZU6UGZJSh7Ze3oGOqrO50He4iwnH39', 
        },
      });

      const blob = await response.blob();
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'image.jpg';
      link.click();
    } catch (error) {
      console.error('Error downloading image:', error);
    }
  };

  const handleCopy = (url) => {
    navigator.clipboard.writeText(url);
    alert('URL copied to clipboard!');
  };

  return (
    <div className='container'>
      <h1 className='text-center my-4'>Image Search</h1>
      <form onSubmit={handleSearch}>
        <div className="input-group mb-2">
          <input
            type="text"
            className='form-control'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter search query"
          />
          <button className='btn btn-primary' type="submit">Search</button>
        </div>
      </form>
      <div className="image-container">
        {images.map((image) => (
          <div key={image.id} className="image-card">
            <img src={image.src.large} alt={image.photographer} />
            <div className="button-container">
              <button onClick={() => handleDownload(image.src.original)}>
                Download
              </button>
              <button onClick={() => handleCopy(image.src.original)}>
                Copy URL
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Image;


//AIzaSyCdojvkXeJoPSxYwFRFXXuibSHJJxS4wpU