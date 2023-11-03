// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "mnc-food-deliveryapp.firebaseapp.com",
    projectId: "mnc-food-deliveryapp",
    storageBucket: "mnc-food-deliveryapp.appspot.com",
    messagingSenderId: "722870207772",
    appId: "1:722870207772:web:10c02082ff1a479c6d26d9",
    measurementId: "G-D0N89S3TZS"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
