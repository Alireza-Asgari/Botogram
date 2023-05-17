import firebase from "firebase/app";
import "firebase/auth";

export const auth = firebase.initializeApp({
    apiKey: "AIzaSyCpDGJgXFyIyQYoEu_ySsL1tmxCTTLpxW8",
    authDomain: "botogram-a7319.firebaseapp.com",
    projectId: "botogram-a7319",
    storageBucket: "botogram-a7319.appspot.com",
    messagingSenderId: "487724915250",
    appId: "1:487724915250:web:e8a96622be388e2fcb3a2b"
  }).auth();