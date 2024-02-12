// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// console.log(import.meta.env.VITE_SOME_KEY)

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB6RgEa0HJ_duZ6q9_V1lhWEmVjBnWQUXQ",
  authDomain: "foodi-client-83fc7.firebaseapp.com",
  projectId: "foodi-client-83fc7",
  storageBucket: "foodi-client-83fc7.appspot.com",
  messagingSenderId: "771042901582",
  appId: "1:771042901582:web:48d337d606b59f9eff0d1f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
