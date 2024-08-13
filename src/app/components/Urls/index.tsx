"use client";
import { useEffect, useState } from "react";
import { db } from "../../lib/firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
import styles from "./urls.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Row from "./Row";

const Urls = () => {
  const [urls, setUrls] = useState<any[]>([]);

  useEffect(() => {
    // Fetch urls collection from Firestore DB
    (async () => {
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
    })();
  }, []);

  useEffect(() => {
    console.log({ urls });
  }, [urls]);

  return (
    <div
      className={styles["urls-list"]}
      style={{ width: "100%", padding: "10px 20px" }}
    >
      <table width='100%'>
        <thead>
          <tr>
            <th>Path</th>
            <th>Date Added</th>
            <th>Owned By</th>
          </tr>
        </thead>
        <tbody>
          {urls.map(({ id, url, createdAt }) => {
            return <Row key={id} id={id} url={url} createdAt={createdAt} />;
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Urls;
