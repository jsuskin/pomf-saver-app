"use client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { db } from "../../lib/firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
import styles from "./urls.module.css";
import Row from "./Row";
import Checkbox from "../Checkbox";

const Urls = ({ setShowModal }: { setShowModal: Dispatch<SetStateAction<boolean>> }) => {
  const [urls, setUrls] = useState<any[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    // Fetch urls collection from Firestore DB
    (async () => {
      const querySnapshot = await getDocs(collection(db, "urls"));
      const urlsList = querySnapshot.docs.map((doc, idx) => ({
        id: doc.id,
        ownerDisplayName: doc.data().owner.displayName,
        ownerUid: doc.data().owner.uid,
        url: doc.data().url,
        createdAt: doc.data().createdAt,
        selected: false,
      }));

      setUrls(urlsList);
    })();
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
                  },
                  setShowModal
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
