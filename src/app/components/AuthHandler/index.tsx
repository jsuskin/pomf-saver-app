import { useEffect } from "react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/app/lib/firebase";
import { signOut } from "@/util/auth-helpers";

const AuthHandler: React.FC = () => {
  useEffect(() => {
    const handleMessages = async (event: MessageEvent) => {
      const { data } = event;

      if (data.initAuth) {
        try {
          const result = await signInWithPopup(auth, new GoogleAuthProvider());
          window.postMessage({ result }, "*"); // Replace '*' with your origin if needed
        } catch (error: any) {
          window.postMessage({ error: error.message }, "*");
        }
      } else if (data.signOut) {
        try {
          await signOut();
          window.postMessage({ success: true }, "*");
        } catch (error: any) {
          window.postMessage({ error: error.message }, "*");
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
