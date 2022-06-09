import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

export const initFirebase =() =>{
  const config = {
    apiKey: "AIzaSyB3DusPNeFruyMVa3iliKD0-EuCI0MwcLA",
    authDomain: "redbuttons-69b75.firebaseapp.com",
    projectId: "redbuttons-69b75",
    storageBucket: "redbuttons-69b75.appspot.com",
    messagingSenderId: "175615661435",
    appId: "1:175615661435:web:8707fc5e8d6a1493d999de",
    measurementId: "G-SZTCQRKJKB",
    databaseURL: 'https://redbuttons-69b75-default-rtdb.europe-west1.firebasedatabase.app',
  };
  
  // Initialize Firebase
  const app = initializeApp(config);
  
  getAuth(app);
  
  // Get a reference to the database service
  getFirestore(app);
}
