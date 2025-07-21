// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCGhok9gjK32Kxh1cOvzyRDKakYo_18X94",
  authDomain: "dany-66632.firebaseapp.com",
  databaseURL: "https://dany-66632-default-rtdb.firebaseio.com",
  projectId: "dany-66632",
  storageBucket: "dany-66632.appspot.com",
  messagingSenderId: "690594176497",
  appId: "1:690594176497:web:bc1eb46c196ba8ff48f850",
  measurementId: "G-EZG99KE5LJ"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { db };
