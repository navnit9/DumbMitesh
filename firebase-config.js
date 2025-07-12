// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCpCWuUqvtmNbYFjugju6GiLFldEqBU6z0",
  authDomain: "mitesh-memes.firebaseapp.com",
  databaseURL: "https://mitesh-memes-default-rtdb.firebaseio.com",
  projectId: "mitesh-memes",
  storageBucket: "mitesh-memes.firebasestorage.app",
  messagingSenderId: "946743114846",
  appId: "1:946743114846:web:af1de869cc936a864cc8cf",
  measurementId: "G-25Q8QHBX55"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
