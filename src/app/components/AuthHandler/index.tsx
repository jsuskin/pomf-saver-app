import { useEffect } from "react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/app/lib/firebase";
import { signOut } from "@/util/auth-helpers";

const AUTH_HANDLER_ORIGIN =
  "https://pomf-saver-cerhtunz6-jsuskins-projects.vercel.app/";

const AuthHandler: React.FC = () => {
  useEffect(() => {
    const handleMessages = async (event: MessageEvent) => {
      const { data } = event;

      if (data.initAuth) {
        try {
          const result = await signInWithPopup(auth, new GoogleAuthProvider());
          window.postMessage({ result }, AUTH_HANDLER_ORIGIN); // Replace '*' with your origin if needed
        } catch (error: any) {
          window.postMessage({ error: error.message }, AUTH_HANDLER_ORIGIN);
        }
      } else if (data.signOut) {
        try {
          await signOut();
          window.postMessage({ success: true }, AUTH_HANDLER_ORIGIN);
        } catch (error: any) {
          window.postMessage({ error: error.message }, AUTH_HANDLER_ORIGIN);
        }
      }
    };

    window.addEventListener("message", handleMessages);

    return () => {
      window.removeEventListener("message", handleMessages);
    };
  }, []);

  return null;
};

export default AuthHandler;
