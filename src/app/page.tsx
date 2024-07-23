"use client";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import styles from "./page.module.css";
import Urls from "./components/Urls";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "./lib/firebase";
import AuthHandler from "./components/AuthHandler";

export default function Home() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log('page.tsx', {currentUser})
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <main className={styles.main}>
      <AuthHandler />
      <Header {...{ user }} />
      <Urls />
    </main>
  );
}
