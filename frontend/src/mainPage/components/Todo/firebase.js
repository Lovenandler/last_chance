import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDEFyJWoe7h0cbGP_j6_yokzqujCHOA8Xc",
    authDomain: "utopia-386509.firebaseapp.com",
    projectId: "utopia-386509",
    storageBucket: "utopia-386509.appspot.com",
    messagingSenderId: "620057456341",
    appId: "1:620057456341:web:a292cc55257b3f35347c5c",
    measurementId: "G-Q6NTJXXF0Z"
  };
  const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };