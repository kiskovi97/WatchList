// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "cook-book-admin.firebaseapp.com",
  projectId: "cook-book-admin",
  storageBucket: "cook-book-admin.firebasestorage.app",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: "G-S9P5S4GTBD"
};

console.log("Firebase REACT_APP_FIREBASE_APP_ID:", process.env.REACT_APP_FIREBASE_APP_ID);

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
