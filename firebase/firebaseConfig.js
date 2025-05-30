import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCokXa15nxjgRewijYshnQbMXG_YMUYkxQ",
  authDomain: "duolingoapi.firebaseapp.com",
  projectId: "duolingoapi",
  storageBucket: "duolingoapi.appspot.com",
  messagingSenderId: "191937378518",
  appId: "1:191937378518:web:8842d46da5dbb74d923177"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const db = firebase.firestore();

export { auth, db };