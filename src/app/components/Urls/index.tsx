"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { db } from "../../lib/firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
import styles from "./urls.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";

const Urls = () => {
  const [urls, setUrls] = useState<any[]>([]);

  useEffect(() => {
    const fetchUrls = async () => {
      const querySnapshot = await getDocs(collection(db, "urls"));
      const urlsList = querySnapshot.docs.map((doc) => ({
        url: doc.data().url,
        createdAt: doc.data().createdAt,
      }));
      setUrls(urlsList);
    };

    fetchUrls();
  }, []);

  type Timestamp = { seconds: number; nanoseconds: number };

  function timestampToDate(timestamp: Timestamp) {
    const { seconds, nanoseconds } = timestamp;
    const milliseconds = seconds * 1000 + nanoseconds / 1000000;
    const date = new Date(milliseconds).toString();
    const trimmedDate = date.split(" ");
    return date;
  }

  return (
    <div>
      <ul className={styles["urls-list"]}>
        {urls.map(({ url, createdAt }, idx) => {
          return (
            <li key={idx}>
              <div className={styles["card-left"]}>
                <input type='checkbox' />
                <div>
                  <div className={styles["asset-thumbnail"]}>
                    <Image
                      src={url}
                      alt={url}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes='(max-width: 100px) 100vw'
                      priority
                    />
                  </div>
                  <a href={url} target='_blank' rel='noopener noreferrer'>
                    {url}
                  </a>
                </div>
              </div>
              <div className={styles["card-right"]}>
                <p className={styles["created-at"]}>
                  {timestampToDate(createdAt)}
                </p>
                <FontAwesomeIcon icon={faEllipsis} />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Urls;
