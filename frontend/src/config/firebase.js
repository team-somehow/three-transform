// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import {
 GoogleAuthProvider,
 getAuth,
 signInWithPopup,
 signInWithEmailAndPassword,
 createUserWithEmailAndPassword,
 sendPasswordResetEmail,
 signOut,
​​} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAvO8NPH9TL8WXVWvRadN-LT0YGfHE_80U",
  authDomain: "ethindia2023.firebaseapp.com",
  projectId: "ethindia2023",
  storageBucket: "ethindia2023.appspot.com",
  messagingSenderId: "1002231812923",
  appId: "1:1002231812923:web:af36dbe1be42914b421d1e",
  measurementId: "G-HLGK2RB2NE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

export const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();
export const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};