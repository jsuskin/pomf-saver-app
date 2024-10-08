import { auth } from "@/app/lib/firebase";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { useEffect, useState } from "react";
import ProfileMenu from "./ProfileMenu";
import Avatar from "./Avatar";
import styles from "../header.module.css";

export default function AuthHandler({ user }: any) {
  console.log("AuthHandler re-render: ", user);
  const [credential, setCredential] = useState<string | undefined>(undefined);
  const [showUserProfileMenu, setShowUserProfileMenu] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await fetch("/api/auth", {
        credentials: "include", // Ensure cookies are sent
      });

      if (response.ok) {
        const {token} = await response.json();
        console.log("auth handler useEffect --> ", {token})
        setCredential(token);
      } else {
        console.error("Error retrieving user data");
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    if (credential) {      
      (async () => {
        console.log({credential})
        try {
          const googleCredential = GoogleAuthProvider.credential(credential);
          console.log({credential, googleCredential})
          const response = await signInWithCredential(auth, googleCredential);
          console.log({ response });
        } catch (error) {
          console.error("Error signing in with Firebase:", error);
        }
      })();
    }
  }, [credential]);

  const authResponseObject = {
    onSuccess: (credentialResponse: CredentialResponse) => {
      console.log({ credentialResponse });
      localStorage.setItem("authToken", credentialResponse.credential || "");
      setCredential(credentialResponse.credential || "");
    },
    onError: () => {
      console.log("Login Failed");
    },
    useOneTap: true,
  };

  return (
    <div className={styles["auth-handler-container"]}>
      {user ? (
        <>
          <Avatar
            avatarUrl={user.photoURL}
            toggleProfileMenu={() => {
              setShowUserProfileMenu((prev) => !prev);
            }}
          />
          {showUserProfileMenu && <ProfileMenu displayName={user.displayName} removeCredential={setCredential} />}
        </>
      ) : (
        <GoogleLogin {...authResponseObject} />
      )}
    </div>
  );
}
