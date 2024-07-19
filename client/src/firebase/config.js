// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBaixMyrf7-G_BJa2B6vDLnidMXHqs0lqo",
  authDomain: "travel-6b3e7.firebaseapp.com",
  projectId: "travel-6b3e7",
  storageBucket: "travel-6b3e7.appspot.com",
  messagingSenderId: "539413999589",
  appId: "1:539413999589:web:4efeece38e2b320115890c",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage();
