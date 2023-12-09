// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAvO8NPH9TL8WXVWvRadN-LT0YGfHE_80U',
  authDomain: 'ethindia2023.firebaseapp.com',
  projectId: 'ethindia2023',
  storageBucket: 'ethindia2023.appspot.com',
  messagingSenderId: '1002231812923',
  appId: '1:1002231812923:web:af36dbe1be42914b421d1e',
  measurementId: 'G-HLGK2RB2NE',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
const auth = getAuth(app);

export const db = getFirestore(app);
export { auth };
