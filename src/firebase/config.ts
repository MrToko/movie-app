import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCF9bR1MBTOZ3lXrOCnryAkL3xqzyajzEU",
  authDomain: "movie-app-356df.firebaseapp.com",
  projectId: "movie-app-356df",
  storageBucket: "movie-app-356df.firebasestorage.app",
  messagingSenderId: "984721685194",
  appId: "1:984721685194:web:278e3d4ff006562c761233",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);