"use client";
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../lib/firebase/firestore";
import Checkbox from "../Checkbox";
import Row from "./Row";
import styles from "./urls.module.css";

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
        <thead>
          <tr>
            <th className={styles["select-all"]}>
              <Checkbox
                handleChange={() => {
                  setSelectAll((prev) => !prev);
                }}
                setChecked={() => {}}
              />
            </th>
            <th>Path</th>
            <th>Date Added</th>
            <th>Owned By</th>
            <th className={styles["row-options-header"]}></th>
          </tr>
        </thead>
        <tbody>
          {urls.map(({ id, url, ownerDisplayName, createdAt, selected }) => {
            return (
              <Row
                key={id}
                {...{
                  id,
                  url,
                  ownerDisplayName,
                  selected,
                  setSelected: () => {
                    setUrls((urlsList) => urlsList.map((obj) => ({ selected: true, ...obj })));
                  }
                }}
                createdAt={createdAt}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Urls;
