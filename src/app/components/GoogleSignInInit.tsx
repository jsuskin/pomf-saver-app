"use client";
import { useEffect } from "react";
import Script from "next/script";

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: any) => void;
          prompt: () => void;
        };
      };
    };
  }
}

export function GoogleSignInInit() {
  useEffect(() => {
    if (typeof window !== "undefined" && window.google) {
      window.google.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        use_fedcm_for_prompt: true,
        callback: handleCredentialResponse,
      });

      window.google.accounts.id.prompt();
    }
  }, []);

  function handleCredentialResponse(response: any) {
    console.log("Encoded JWT ID token: " + response.credential);
    // Here you would typically send the token to your server
  }

  return (
    <Script
      src='https://accounts.google.com/gsi/client'
      strategy='afterInteractive'
      onLoad={() => {
        console.log("Google Sign-In script loaded successfully", {
          clientID: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        });
      }}
    />
  );
}
