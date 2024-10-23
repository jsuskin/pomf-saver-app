import React, { Suspense } from "react";
import Image from "next/image";
import VideoPlayer from "../../../VideoPlayer";
import styles from "../../urls.module.css";

export default function AssetThumbnail({ url }: { url: string }) {
  return (
    <div className={styles["asset-thumbnail"]}>
      {url.split(".").pop() === "mp4" ? (
        <Suspense fallback={<p>Loading video...</p>}>
          <VideoPlayer src={url} />
        </Suspense>
      ) : (
        <Image
          src={url}
          alt={url}
          width={25}
          height={25}
          style={{ objectFit: "cover" }}
          priority
        />
      )}
    </div>
  );
}
