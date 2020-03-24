import firebase from "firebase/app";
import "firebase/auth";
// import 'firebase/firestore';
import "firebase/database";

var firebaseConfig = {
  apiKey: "AIzaSyAjo9cQB41bbOXb25awXVqWYt6PwPvc7ZQ",
  authDomain: "notes-simple.firebaseapp.com",
  databaseURL: "https://notes-simple.firebaseio.com",
  projectId: "notes-simple",
  storageBucket: "notes-simple.appspot.com",
  messagingSenderId: "37231956771",
  appId: "1:37231956771:web:f028e8ae4874ccf088b296",
  measurementId: "G-7ZDPZWTJXT"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const database = firebase.database();

export default firebase;
