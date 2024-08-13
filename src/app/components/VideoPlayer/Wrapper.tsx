"use client"; // Ensure this is a client component
import { useEffect, useState } from "react";
import VideoPlayer from ".";

export default function VideoWrapper({ videoId }: { videoId: string }) {
  const [videoData, setVideoData] = useState<null | { [key: string]: any }>(
    null
  );

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
        <VideoPlayer src={videoData?.videoUrl} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
