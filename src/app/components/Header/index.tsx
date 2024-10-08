import React, { useEffect } from "react";
import styles from "./header.module.css";
import AuthHandler from "./AuthHandler";

export default function Header({ user }: any) {
  useEffect(() => {
    console.log("header -> ", { user });
  }, [user]);

  return (
    <header className={styles.header}>
      <header className={styles.subheader}>
        <p>
          Navigate to{" "}
          <a href='https://pomf2.lain.la/' style={{ fontWeight: "600" }}>
            https://pomf2.lain.la/
          </a>
        </p>
      </header>
      <header className={styles["header-main"]}>
        <h1>Pomf Saver</h1>
        <AuthHandler user={user} />
      </header>
    </header>
  );
}
