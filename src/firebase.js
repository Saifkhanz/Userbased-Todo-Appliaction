// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyA9n22qs6i73sLR0nXJg6I2VVM8N3e6xFE',
    authDomain: 'fbauth-592b5.firebaseapp.com',
    databaseURL: 'https://fbauth-592b5-default-rtdb.firebaseio.com',
    projectId: 'fbauth-592b5',
    storageBucket: 'fbauth-592b5.appspot.com',
    messagingSenderId: '366032002566',
    appId: '1:366032002566:web:9645994d933f9aa8fb6d87',
    measurementId: 'G-PDDQLBP9TV'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const database=getDatabase(app)
export {
    db,auth,app,database
}