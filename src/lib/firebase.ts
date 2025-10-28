// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA2R-_YpcbkKx4OVPP4dX29e4xe-K2eyAA",
  authDomain: "xpektrav3.firebaseapp.com",
  projectId: "xpektrav3",
storageBucket: "xpektrav3.appspot.com",
  messagingSenderId: "520104380024",
  appId: "1:520104380024:web:d7642df1b67d1a1dad4f8d",
  measurementId: "G-S73XVYT91L"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
