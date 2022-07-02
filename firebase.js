import * as firebase from "firebase";
import * as React from 'react';
import Auth from 'firebase/auth';
import database from 'firebase/database';
import App from './App';
import 'firebase/firestore';


// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCn4qEv_x9WvzRbWZv3UKyCBb1DHXLKlLU",
  authDomain: "grunfood-3345d.firebaseapp.com",
  projectId: "grunfood-3345d",
  storageBucket: "grunfood-3345d.appspot.com",
  messagingSenderId: "977269763561",
  appId: "1:977269763561:web:c1d43fb23aa3cf51e22f78",
  measurementId: "G-Z2TM3K48RE"
};

// Initialize Firebase
//const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

let app;

if (firebase.apps.length === 0){
    app = firebase.initializeApp(firebaseConfig); 
}
else{
    app = firebase.app()
}

//const db = app.firestore()
const auth = firebase.auth()

export { auth};

//function firebase(){
//    return <App />
//}

export default firebase;