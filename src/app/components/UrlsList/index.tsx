"use client";
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../lib/firebase";
import styles from "./urls.module.css";
import THead from "./Table/THead";
import TBody from "./Table/TBody";

const Urls = () => {
  const [urls, setUrls] = useState<any[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    // Set up Firestore listener for real-time updates
    const unsubscribe = onSnapshot(collection(db, "urls"), (snapshot) => {
      const urlsList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ownerDisplayName: doc.data().owner.displayName,
        ownerUid: doc.data().owner.uid,
        url: doc.data().url,
        name: doc.data().name,
        createdAt: doc.data().createdAt,
        selected: false,
      }));

      setUrls(urlsList);
    });

    // Cleanup the listener on unmount
    return () => unsubscribe();
  }, []);


  useEffect(() => {
    if (selectAll) {
      setUrls((urlsList) => {
        return urlsList.map((obj) => ({ selected: true, ...obj }));
      });
    }
  }, [selectAll]);

  return (
    <div className={styles["urls-list-container"]}>
      <table width='100%' className={styles["urls-list"]}>
        <THead
          toggleSelectAll={() => {
            setSelectAll((prev) => !prev);
          }}
        />
        <TBody {...{ urls, setUrls }} />
      </table>
    </div>
  );
};

export default Urls;
