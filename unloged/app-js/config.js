// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAGE6QozbI2zejl8zLtWiQHn4sIuVkCCxo",
  authDomain: "gx-store-ad42a.firebaseapp.com",
  projectId: "gx-store-ad42a",
  storageBucket: "gx-store-ad42a.firebasestorage.app",
  messagingSenderId: "520372502359",
  appId: "1:520372502359:web:9dbf76c60f2ebcb969c812",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
export default auth;
