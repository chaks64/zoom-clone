// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { collection, getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyAH6vjuImTsotkBxRtHFKktn_gfKOM-Hu8",
//   authDomain: "mywebapp-a82d5.firebaseapp.com",
//   projectId: "mywebapp-a82d5",
//   storageBucket: "mywebapp-a82d5.appspot.com",
//   messagingSenderId: "1027834180152",
//   appId: "1:1027834180152:web:767d6ddda0cfbbc6ef6ccd",
//   measurementId: "G-T6NKH2FMK2"
// };
const firebaseConfig = {
  apiKey: "AIzaSyAw1B-CIdqCVhXah0b6cYHhFYr6k-LaOh8",
  authDomain: "test-f5051.firebaseapp.com",
  projectId: "test-f5051",
  storageBucket: "test-f5051.appspot.com",
  messagingSenderId: "620091724925",
  appId: "1:620091724925:web:257485bba973df028b4d14",
  measurementId: "G-C2SWRK7XBK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
export const firebaseDB = getFirestore(app);

export const userRef = collection(firebaseDB, "users");
export const meetingRef = collection(firebaseDB, "meetings");
