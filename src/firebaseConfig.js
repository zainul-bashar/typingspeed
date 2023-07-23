import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyA5qZBRcRZvb5MefLxDp4alyD7-e9XLUGo",
    authDomain: "typing-speed-3236b.firebaseapp.com",
    projectId: "typing-speed-3236b",
    storageBucket: "typing-speed-3236b.appspot.com",
    messagingSenderId: "465711580091",
    appId: "1:465711580091:web:25121fdcfcc4415480fa9e",
    measurementId: "G-HRL2TT6JH3"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const auth = firebase.auth();
  const db = firebaseApp.firestore();

  export {auth , db};