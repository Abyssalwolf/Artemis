import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyAD4xqnxvaYxl5cNZRqREbq_4PBXOthe_s",
  authDomain: "artemis-9d63d.firebaseapp.com",
  projectId: "artemis-9d63d",
  storageBucket: "artemis-9d63d.firebasestorage.app",
  messagingSenderId: "479078952718",
  appId: "1:479078952718:web:d1b995e2ad15ba2dcbf15f",
  measurementId: "G-5HL8RL5NZB",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);