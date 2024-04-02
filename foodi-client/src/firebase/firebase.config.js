// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// console.log(import.meta.env.VITE_SOME_KEY)

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBwWgLUW4VDaZcVcx79vTLyV6N9tcOhEPc",
  authDomain: "foodi-client-deploy-85c70.firebaseapp.com",
  projectId: "foodi-client-deploy-85c70",
  storageBucket: "foodi-client-deploy-85c70.appspot.com",
  messagingSenderId: "492063670650",
  appId: "1:492063670650:web:750bc17619f84a614356c3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
