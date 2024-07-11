"use client";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import styles from "./page.module.css";
import Urls from "./components/Urls";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "./lib/firebase";

export default function Home() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    console.log({ user });
  }, [user]);

  return (
    <main className={styles.main}>
      <Header {...{ user }} />
      <Urls />
    </main>
  );
}
