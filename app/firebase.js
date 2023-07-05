
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyClfCVhUnFBTCZvYU5pYL2aPFmUhZUkMz0",
  authDomain: "todo-app-649aa.firebaseapp.com",
  projectId: "todo-app-649aa",
  storageBucket: "todo-app-649aa.appspot.com",
  messagingSenderId: "541078168827",
  appId: "1:541078168827:web:acb57c81d004d277cf7c5e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
