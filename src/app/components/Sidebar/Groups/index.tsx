import React, { useState, useEffect } from "react";
import styles from "../sidebar.module.css";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/app/lib/firebase";
import type { Group } from "@/util/types";
import GroupListItem from "./ListItem";

export default function Groups() {
  const [groups, setGroups] = useState<Group[]>([]);

  useEffect(() => {
    // Set up Firestore listener for real-time updates
    const unsubscribe = onSnapshot(collection(db, "groups"), (snapshot) => {
      const groupsList = snapshot.docs.map((doc) => ({
        id: doc.id,
        owner: doc.data().owner,
        name: doc.data().name,
        members: doc.data().members,
      }));

      setGroups(groupsList);
    });

    // Cleanup the listener on unmount
    return () => unsubscribe();
  }, []);

  return (
    <ul className={styles["sidebar-list"]}>
      <h2>Groups</h2>
      <div className={styles["groups-list-container"]}>
        <GroupListItem name='All' size={100} />
        <GroupListItem name='Recent' size={100} />
        {groups.map(({ name, members }, idx) => (
          <GroupListItem key={idx} name={name} size={members.length} />
        ))}
      </div>
    </ul>
  );
}