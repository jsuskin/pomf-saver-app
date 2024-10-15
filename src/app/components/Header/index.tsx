import React, { useState } from "react";
import styles from "./header.module.css";
import AuthHandler from "./AuthHandler";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faCircleXmark } from "@fortawesome/free-solid-svg-icons";

export default function Header({ user }: any) {
  const [searchText, setSearchText] = useState("");

  return (
    <header className={styles.header}>
      <header className={styles.subheader}>
        <p>
          Navigate to{" "}
          <a
            href='https://pomf2.lain.la/'
            className={styles["subheader-link"]}
            rel='noopener noreferrer'
            target='_blank'
          >
            https://pomf2.lain.la/
          </a>
        </p>
      </header>
      <header className={styles["header-main"]}>
        <img src='/assets/logo.png' alt='Logo' style={{ height: "50px", width: "50px" }} />
        <div className={styles["searchbar-container"]}>
          <FontAwesomeIcon icon={faMagnifyingGlass} className={styles["search-icon"]} />
          <input
            type='text'
            placeholder='Search'
            className={styles.searchbar}
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          {searchText.length ? (
            <FontAwesomeIcon
              icon={faCircleXmark}
              className={styles["clear-search-text-icon"]}
              onClick={() => {
                setSearchText("");
              }}
            />
          ) : (
            <></>
          )}
        </div>
        <AuthHandler user={user} />
      </header>
    </header>
  );
}
