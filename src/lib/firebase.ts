import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDLBf5tK9j9BZ3-L0uRS3CeFepn-FlwsWI",
  authDomain: "verirx-7c0b0.firebaseapp.com",
  projectId: "verirx-7c0b0",
  storageBucket: "verirx-7c0b0.firebasestorage.app",
  messagingSenderId: "1051682678465",
  appId: "1:1051682678465:web:6925f5f4554f48dfef5640",
};

// Guard against re-initializing on hot-reload during development.
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const db = getFirestore(app);
