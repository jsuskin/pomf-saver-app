"use client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { onIdTokenChanged, User } from "firebase/auth";
import { useEffect, useState } from "react";
import MainContent from "./components/MainContent";
import Loading from "./components/Loading";
import { auth } from "./lib/firebase";
import styles from "./page.module.css";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribeFromAuthUpdates = onIdTokenChanged(auth, async (currentUser) => {
      if (currentUser) {
        // Get the token and log it
        const token = await currentUser.getIdToken();
        console.log("Retrieved token:", token);
      }

      setUser(currentUser);
      setIsLoading(false);
    });

    return () => {
      unsubscribeFromAuthUpdates();
    };
  }, []);

  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string}>
      <main className={styles.main}>{isLoading ? <Loading /> : <MainContent user={user} />}</main>
    </GoogleOAuthProvider>
  );
}
