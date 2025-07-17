// firebaseConfig.js

import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Corrected Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDDplfoGH0Qs6B_roynZpDQ3zJnPI7aumA",
  authDomain: "my-to-do-5139e.firebaseapp.com",
  projectId: "my-to-do-5139e",
  storageBucket: "my-to-do-5139e.appspot.com", // ✅ Fixed domain
  messagingSenderId: "437416389152",
  appId: "1:437416389152:web:282f3851bfbeb884ad6a45",
  measurementId: "G-Y3VGKT9YZP", // Optional, not used in React Native
};

// Initialize app once
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Init services
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };

