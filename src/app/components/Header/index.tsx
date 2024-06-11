import React from "react";
import styles from "./header.module.css";
import {
  signInWithPopup,
  signInWithRedirect,
  GoogleAuthProvider,
  signOut as _signOut,
} from "firebase/auth";
import { auth, provider } from "../../lib/firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

export default function Header({ user }: any) {
  const signIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      const user = result.user;
      console.log({ user, token });
    } catch (error) {
      console.error("Error during sign-in with popup", error);
    }
  }

  const signOut = () => {
    _signOut(auth)
      .then(() => {
        console.log("Successfully logged out.");
      })
      .catch((error) => {
        console.error(error);
      });
  }

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
