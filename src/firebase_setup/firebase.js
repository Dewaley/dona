// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyChrD0rQUCIdCRJ667MDdemo9AbnzhKk10",
  authDomain: "dona-clone.firebaseapp.com",
  projectId: "dona-clone",
  storageBucket: "dona-clone.appspot.com",
  messagingSenderId: "420918438618",
  appId: "1:420918438618:web:5063cd35ae58f8f4ac93e3",
  measurementId: "G-MBCSDZNMSX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
