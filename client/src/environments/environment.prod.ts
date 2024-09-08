export const environment = {
  production: true
};

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyAqLS_nk3Kg8NjIs4jLknYuHv6BVb_Bimc",
  authDomain: "kolman-freecss-1e251.firebaseapp.com",
  projectId: "kolman-freecss-1e251",
  storageBucket: "kolman-freecss-1e251.appspot.com",
  messagingSenderId: "123537064748",
  appId: "1:123537064748:web:69fc756f62e63b69db6289",
  measurementId: "G-LMVNWXGFZD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
