// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyARaZz8O1OjoPFbtI7GsISNe26Wqhz11rI",
  authDomain: "kodecamp-and-context-api.firebaseapp.com",
  databaseURL: "https://kodecamp-and-context-api-default-rtdb.firebaseio.com",
  projectId: "kodecamp-and-context-api",
  storageBucket: "kodecamp-and-context-api.appspot.com",
  messagingSenderId: "23076545972",
  appId: "1:23076545972:web:6714f2fff04e269897bee1",
  measurementId: "G-SK7JH0LT9G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app)

export default auth 