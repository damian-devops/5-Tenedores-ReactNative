import firebase from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyCmTQvcpPN4YHRX_KEQx3fhYuU0AE1OtL8",
    authDomain: "tenedores-9925e.firebaseapp.com",
    projectId: "tenedores-9925e",
    storageBucket: "tenedores-9925e.appspot.com",
    messagingSenderId: "768146053328",
    appId: "1:768146053328:web:78571f34ef2f1d370926d5"
  };
  
  // Initialize Firebase
 export const firebaseApp = firebase.initializeApp(firebaseConfig);