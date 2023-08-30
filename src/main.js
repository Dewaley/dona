import "./assets/main.css";
import { createApp } from "vue";
import App from "./App.vue";
import { router } from "./router";
import { createPinia } from "pinia";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
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
  databaseURL: "https://dona-clone-default-rtdb.firebaseio.com/",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth(firebaseApp);
export const db = getDatabase(firebaseApp);

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");

/*
 const users = {
 1111: {
      todos: {
      
      },
      categories: {
      
      }
 },
 2222: {
      todos: {
            
            },
      categories: {
      
      }
 }
 }
*/
