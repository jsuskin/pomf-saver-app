import React, { useEffect, useState } from "react";
import styles from "./loading.module.css";

export default function Loading() {
  const [dots, setDots] = useState(".");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev === "..." ? "." : prev + "."));
    }, 250);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);
  return (
    <div className={styles["loading-screen"]}>
      <img src='/assets/logo.png' alt='Logo' className={styles.logo} />
      <p className={styles["loading-text"]}>
        Loading<span className={styles.dots}>{dots}</span>
      </p>
    </div>
  );
}
