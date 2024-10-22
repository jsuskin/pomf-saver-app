/*** IMPORTS ***/
import { useEffect, useRef, useState } from "react";
import styles from "../header.module.css";
import Avatar from "./Avatar";
import ProfileMenu from "./ProfileMenu";

// OAUTH
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";

// FIREBASE
import { auth } from "@/app/lib/firebase";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";

/*** EXPORT ***/
export default function AuthHandler({ user }: any) {
  const [credential, setCredential] = useState<string | null>(null);
  const [showUserProfileMenu, setShowUserProfileMenu] = useState(false);

  useEffect(() => {
    if (credential) {
      (async () => {
        console.log({ credential });
        try {
          const googleCredential = GoogleAuthProvider.credential(credential);
          console.log({ credential, googleCredential });
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
          {showUserProfileMenu && (
            <ProfileMenu
              displayName={user.displayName}
              closeMenu={() => {
                setShowUserProfileMenu(false);
              }}
              removeCredential={() => setCredential(null)}
            />
          )}
        </>
      ) : (
        <GoogleLogin {...authResponseObject} />
      )}
    </div>
  );
}
