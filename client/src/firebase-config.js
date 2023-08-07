// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyBK8wS8lbFjzHxsLG0lHycg0ncpdq1PpdM",
  authDomain: "universitrack.firebaseapp.com",
  projectId: "universitrack",
  storageBucket: "universitrack.appspot.com",
  messagingSenderId: "1078041557060",
  appId: "1:1078041557060:web:f63d22c5f813afd0f32411",
  measurementId: "G-WSMJNZ4H22",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    console.log(result);
  } catch (err) {
    console.log(err);
  }
};
