"use client";
import { useEffect } from "react";
import { signIn, signOut } from "@/util/auth-helpers";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/firebase";

export default function SignInWithPopup() {
  useEffect(() => {
    console.log("component loaded");
    const PARENT_FRAME = window.location.ancestorOrigins[0];

    const sendResponse = (result: any) => {
      console.log("sending response from signInWithPopup: ", result);
      window.parent.postMessage(JSON.stringify(result), PARENT_FRAME);
    };

    const messageHandler = async ({ data }: any) => {
      console.log("message received: ", data);
      if (data.initAuth) {
        console.log("Initializing auth...");
        const result = await signIn();
        sendResponse(result);
      } else if (data.signOut) {
        try {
          await signOut();
          sendResponse({ success: true }); // Send a success response
        } catch (error: any) {
          sendResponse({ success: false, error: error.message }); // Send an error response
        }
      }
    };

    // Function to handle authentication state changes
    const handleAuthStateChange = (currentUser: any) => {
      console.log("auth state changed: ", currentUser);
      sendResponse({ isAuthenticated: !!currentUser });
    };

    // Subscribe to authentication state changes from Firebase
    const unsubscribe = onAuthStateChanged(auth, handleAuthStateChange);

    window.addEventListener("message", messageHandler);

    return () => {
      unsubscribe(); // Clean up: unsubscribe from authentication state changes
      window.removeEventListener("message", messageHandler);
      console.log("Event listener removed");
    };
  }, []);

  return (
    <div>
      <h1>signInWithPopup</h1>
    </div>
  );
}
