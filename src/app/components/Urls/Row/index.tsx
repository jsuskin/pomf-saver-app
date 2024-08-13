import React, { Suspense } from "react";
import Image from "next/image";
import styles from "../urls.module.css";
import VideoPlayer from "../../VideoPlayer";

type Timestamp = { seconds: number; nanoseconds: number };

export default function Row({
  id,
  url,
  createdAt,
}: {
  id: string;
  url: string;
  createdAt: any;
}) {
  function timestampToDate(timestamp: Timestamp) {
    const date = new Date(timestamp.seconds * 1000);

    // Helper function to pad single digit numbers with leading zeros
    const pad = (num: number) => String(num).padStart(2, "0");

    // Format the Date object into MM/DD/YY, HH:MM format
    const formattedDate = `${pad(date.getMonth() + 1)}/${pad(
      date.getDate()
    )}/${String(date.getFullYear()).slice(-2)}, ${pad(date.getHours())}:${pad(
      date.getMinutes()
    )}`;

    return formattedDate;
  }

  return (
    <tr key={id}>
      <td>
        <div className={styles["asset-thumbnail"]}>
          {url.split(".").pop() === "mp4" ? (
            <Suspense fallback={<p>Loading video...</p>}>
              <VideoPlayer src={url} />
            </Suspense>
          ) : (
            <Image
              src={url}
              alt={url}
              fill
              style={{ objectFit: "cover" }}
              sizes='(max-width: 100px) 100vw'
              priority
            />
          )}
        </div>
        <p>{url}</p>
      </td>
      <td>{timestampToDate(createdAt)}</td>
      <td>OWNER</td>
    </tr>
  );
}
