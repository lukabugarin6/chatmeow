import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBaSI0jXGmC7YP0ZP97MWzPOHCyi0dymyw",
  authDomain: "chat-app-48316.firebaseapp.com",
  projectId: "chat-app-48316",
  storageBucket: "chat-app-48316.appspot.com",
  messagingSenderId: "516812434768",
  appId: "1:516812434768:web:9a4e8a7c71d9dcd7949055",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider, db };
