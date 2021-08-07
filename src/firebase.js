/* eslint-disable no-unused-vars */
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCka7RSd1DmwxgbJQooPrqS2L5ULWgQ3Mk",
    authDomain: "contacts-satvik.firebaseapp.com",
    projectId: "contacts-satvik",
    storageBucket: "contacts-satvik.appspot.com",
    messagingSenderId: "804595995251",
    appId: "1:804595995251:web:f4ee70f6d6457e55c7d006"
});

const db = firebase.firestore();

export default db;