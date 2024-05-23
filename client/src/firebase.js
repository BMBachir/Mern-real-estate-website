// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-6569d.firebaseapp.com",
  projectId: "mern-estate-6569d",
  storageBucket: "mern-estate-6569d.appspot.com",
  messagingSenderId: "314081337873",
  appId: "1:314081337873:web:1a2e39f5fb842c46cc47b0",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
