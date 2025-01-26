import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDxL797QLarXi69kv_6u54zzcVB56jV-Zk",
  authDomain: "discord-clone-78a3f.firebaseapp.com",
  projectId: "discord-clone-78a3f",
  storageBucket: "discord-clone-78a3f.firebasestorage.app",
  messagingSenderId: "334088161481",
  appId: "1:334088161481:web:1b73422207d093d86ba518"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { db, auth, provider };