import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import  Image from  './component/Image';
import Video from "./component/Video";
import Navbar from "./component/route/Navbar";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import ImageSearch from "./component/YouTubeSearch";
import YouTubeSearch from "./component/YouTubeSearch";
import VideoDownloader from "./component/VideoDownloader";
function App() {
  return (

        <BrowserRouter>
        <Navbar/>
      <Routes>
          <Route path="/" element={<YouTubeSearch />} />
          <Route path="/image" element={<Image />} />
          <Route path="/video" element={<Video />} />
          <Route path="/dow" element={<VideoDownloader />} />
          <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

function NoPage() {
  return(
    <h1>ERROR 404</h1>
  )
}

export default App;
