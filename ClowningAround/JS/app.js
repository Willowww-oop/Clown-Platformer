// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDDVA8eRlNOaZIsMEaJlypv-XVW8noEVVM",
  authDomain: "clowning-around-40bd5.firebaseapp.com",
  projectId: "clowning-around-40bd5",
  storageBucket: "clowning-around-40bd5.firebasestorage.app",
  messagingSenderId: "803045719396",
  appId: "1:803045719396:web:5b5a4272c282a559810e71"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

import { getDatabase, ref, set } from "firebase/database";
import { getDatabase, ref, onValue } from "firebase/database";

console.log(app)