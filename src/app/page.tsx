"use client";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import styles from "./page.module.css";
import Urls from "./components/Urls";
import { onAuthStateChanged, onIdTokenChanged, User } from "firebase/auth";
import { auth } from "./lib/firebase";
import { GoogleOAuthProvider } from "@react-oauth/google";

export default function Home() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
    const unsubscribe = onIdTokenChanged(auth, async (currentUser) => {
      console.log("page.tsx -> auth state changed", { currentUser });

      if (currentUser) {
        // Get the token and log it
        const token = await currentUser.getIdToken();
        console.log("Retrieved token:", token);
      }

      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    console.log("page.tsx: ", { user });
  }, [user]);

  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string}>
      <main className={styles.main}>
        <Header user={user} />
        <Urls />
      </main>
    </GoogleOAuthProvider>
  );
}
