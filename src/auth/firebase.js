import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";


const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: "synergiser-ai.firebaseapp.com",
  projectId: "synergiser-ai",
  storageBucket: "synergiser-ai.appspot.com",
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Google Auth provider
const googleProvider = new GoogleAuthProvider();
  
// whenever a user interacts with the provider, we force them to select an account
googleProvider.setCustomParameters({   
    prompt : "select_account "
});

export const fireBaseAuth = getAuth(app);

export const signInWithGoogle = () => signInWithPopup(fireBaseAuth, googleProvider);
export const signOutWithGoogle = () => signOut(fireBaseAuth);