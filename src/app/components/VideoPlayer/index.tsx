"use client"; // Ensure this is also a client component
import React from "react";

export default function VideoPlayer({ src }: { src: string }) {
  return (
    <video>
      <source src={src} type='video/mp4' />
      Your browser does not support the video tag.
    </video>
  );
}
