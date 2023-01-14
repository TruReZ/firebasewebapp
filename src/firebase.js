import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "reactdataform.firebaseapp.com",
  projectId: "reactdataform",
  storageBucket: "reactdataform.appspot.com",
  messagingSenderId: "204920109097",
  appId: "1:204920109097:web:6d2678d31940911aa58438",
  measurementId: "G-7YRBCTEMLE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);