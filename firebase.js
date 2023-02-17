import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDc6BG2iY4NdOUrGNdbPts29f7xXAaRSsg",
  authDomain: "todoapp-10ee1.firebaseapp.com",
  projectId: "todoapp-10ee1",
  storageBucket: "todoapp-10ee1.appspot.com",
  messagingSenderId: "293108887646",
  appId: "1:293108887646:web:2506135cee651a8a8d44cf",
  measurementId: "G-49SV6LM7R2"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export {
    auth,
    db
}
