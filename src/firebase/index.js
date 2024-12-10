import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Paste your firebaseConfig from Firebase Console here
const firebaseConfig = {
    apiKey: "AIzaSyAp2eEWGuOwkNNfvBTaTmiYwJWkcEkOsYU",
    authDomain: "summative-78780.firebaseapp.com",
    projectId: "summative-78780",
    storageBucket: "summative-78780.firebasestorage.app",
    messagingSenderId: "320774265328",
    appId: "1:320774265328:web:d0c59399506bdd86bbe535"
  };

const config = initializeApp(firebaseConfig)
const auth = getAuth(config);
const firestore = getFirestore(config);

export { auth, firestore };