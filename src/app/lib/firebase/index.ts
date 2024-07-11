// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDOG0FNppjmdjzbSghETjjUEm1nPg-CsiU",
  // apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "pomf-saver.firebaseapp.com",
  projectId: "pomf-saver",
  storageBucket: "pomf-saver.appspot.com",
  messagingSenderId: "179573700881",
  appId: "1:179573700881:web:81a8664f831394f57e74b0",
  measurementId: "G-59QWYK8BEE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export default app;
