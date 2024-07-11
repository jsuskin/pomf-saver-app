import React from "react";
import styles from "./header.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { signIn, signOut } from "@/util/auth-helpers";

export default function Header({ user }: any) {
  const handleClick = async (e: any) => {
    e.preventDefault();

    user ? signOut() : await signIn();
  };

  return (
    <header className={styles.header}>
      <h1>Pomf Saver</h1>
      <button className={styles["auth-button"]} onClick={handleClick}>
        <div className={styles["google-icon-container"]}>
          <FontAwesomeIcon icon={faGoogle} />
        </div>
        <p>{user ? "Sign Out" : "Sign In"}</p>
      </button>
    </header>
  );
}

