import React from 'react'
import Checkbox from "../../Checkbox";
import styles from "../urls.module.css";

export default function THead({ toggleSelectAll }: any) {
  return (
    <thead>
      <tr>
        <th className={styles["select-all"]}>
          <Checkbox
            handleChange={toggleSelectAll}
            setChecked={() => {}}
          />
        </th>
        <th>Name</th>
        <th>Date Added</th>
        <th>Owned By</th>
        <th className={styles["row-options-header"]}></th>
      </tr>
    </thead>
  );
}
