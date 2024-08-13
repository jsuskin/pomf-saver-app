// VideoWrapper.jsx

"use client"; // Ensure this is a client component

import { useEffect, useState } from "react";
import VideoPlayer from "./VideoPlayer";

export default function VideoWrapper({ videoId }) {
  const [videoData, setVideoData] = useState(null);

  useEffect(() => {
    async function fetchVideoData() {
      // Fetch the video data
      const response = await fetch(`/api/video/${videoId}`);
      const data = await response.json();
      setVideoData(data);
    }

    fetchVideoData();
  }, [videoId]);

  return (
    <div>
      {videoData ? (
        <VideoPlayer videoUrl={videoData.videoUrl} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
