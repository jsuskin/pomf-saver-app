"use client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { onIdTokenChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import Loading from "./components/Loading";
import MainContent from "./components/MainContent";
import { auth } from "./lib/firebase";
import { setUser } from "./lib/redux/features/user/userSlice";
import { useAppDispatch } from "./lib/redux/hooks";
import styles from "./page.module.css";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribeFromAuthUpdates = onIdTokenChanged(auth, async (currentUser) => {
      dispatch(
        setUser({
          uid: currentUser?.uid,
          displayName: currentUser?.displayName,
          photoURL: currentUser?.photoURL,
        })
      );

      setIsLoading(false);
    });

    return () => {
      unsubscribeFromAuthUpdates();
    };
  }, []);

  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string}>
      <main className={styles.main}>{isLoading ? <Loading /> : <MainContent />}</main>
    </GoogleOAuthProvider>
  );
}
