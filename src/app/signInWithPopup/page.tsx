"use client";
import { useEffect } from "react";
import { signIn } from "@/util/auth-helpers";

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
      }
    };

    window.addEventListener("message", messageHandler);

    return () => {
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
