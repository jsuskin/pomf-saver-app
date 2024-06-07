// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "pomf-saver.firebaseapp.com",
  projectId: "pomf-saver",
  storageBucket: "pomf-saver.appspot.com",
  messagingSenderId: "179573700881",
  appId: "1:179573700881:web:81a8664f831394f57e74b0",
  measurementId: "G-59QWYK8BEE",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
