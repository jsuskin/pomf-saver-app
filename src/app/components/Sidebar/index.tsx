import React, { useState } from "react";
import Groups from "./Groups";
import styles from "./sidebar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleChevronLeft, faCircleChevronRight } from "@fortawesome/free-solid-svg-icons";

export default function Sidebar() {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className={`${styles.sidebar} ${!showSidebar && styles.hide}`}>
      <Groups />
      <div className={styles["handle-base"]}></div>
      <FontAwesomeIcon
        icon={faCircleChevronRight}
        className={styles.handle}
        onClick={() => {
          setShowSidebar((prev) => !prev);
        }}
      />
    </div>
  );
}
