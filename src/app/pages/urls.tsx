"use client";
import { useEffect, useState } from "react";
import { db } from "../lib/firebase/firestore";
import { collection, getDocs } from "firebase/firestore";

const Urls = () => {
  const [urls, setUrls] = useState<any[]>([]);

  useEffect(() => {
    const fetchUrls = async () => {
      const querySnapshot = await getDocs(collection(db, "urls"));
      const urlsList = querySnapshot.docs.map((doc) => doc.data().url);
      setUrls(urlsList);
    };

    fetchUrls();
  }, []);

  useEffect(() => {
    console.log({ urls });
  }, [urls]);

  return (
    <div>
      <h1>Saved URLs</h1>
      <ul>
        {urls.map((url, index) => (
          <li key={index}>
            <a href={url} target='_blank' rel='noopener noreferrer'>
              {url}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Urls;
