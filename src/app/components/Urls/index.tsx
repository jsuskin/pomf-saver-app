"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { db } from "../../lib/firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
import styles from "./urls.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const Urls = () => {
  const [urls, setUrls] = useState<any[]>([]);

  useEffect(() => {
    const fetchUrls = async () => {
      const querySnapshot = await getDocs(collection(db, "urls"));
      const urlsList = querySnapshot.docs.map((doc, idx) => {
        const obj = {
          id: doc.id,
          url: doc.data().url,
          createdAt: doc.data().createdAt,
        };

        return obj;
      });

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
              <Link
                href={url}
                className={styles.card}
                rel='noopener noreferrer'
                target='_blank'
              >
                <div className={styles["card-left"]}>
                  <input
                    id={`checkbox-${url.split("/").pop()}`}
                    type='checkbox'
                    checked={false}
                    onChange={() => {
                      "hello";
                    }}
                  />
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
                    <p>{url}</p>
                  </div>
                </div>
                <div className={styles["card-right"]}>
                  <p className={styles["created-at"]}>
                    {timestampToDate(createdAt)}
                  </p>
                  <FontAwesomeIcon icon={faEllipsis} />
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Urls;
