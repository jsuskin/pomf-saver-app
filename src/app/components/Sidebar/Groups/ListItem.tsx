import React from 'react'
import styles from "../sidebar.module.css";
import type { GroupListItem } from '@/util/types';


export default function GroupListItem({ name, size }: GroupListItem) {
  return (
    <li className={styles.group}>
      <h4>{name}</h4>
      <p>
        {size} item{size > 1 ? "s" : ""}
      </p>
    </li>
  );
}
