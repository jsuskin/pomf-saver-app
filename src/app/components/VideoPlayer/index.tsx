// VideoPlayer.jsx

"use client"; // Ensure this is also a client component

export default function VideoPlayer({ url }) {
  return (
    <video controls>
      <source src={videoUrl} type='video/mp4' />
      Your browser does not support the video tag.
    </video>
  );
}
