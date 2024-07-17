import {
  signInWithPopup,
  GoogleAuthProvider,
  signOut as _signOut,
} from "firebase/auth";
import { auth, provider } from "../app/lib/firebase";

export const signIn = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken;
    const user = result.user;
    return { user, token, credential };
  } catch (error) {
    console.error("Error during sign-in with popup", error);
    throw error
  }
};

export const signOut = () => {
  console.log("gfeyuhbgwriyubwrgbuhiywerg")
  _signOut(auth)
    .then(() => {
      console.log("Successfully logged out.");
      return { success: true };
    })
    .catch((error) => {
      throw error;
    });
};
