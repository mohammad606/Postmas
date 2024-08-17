import firebase from 'firebase/compat/app'
import 'firebase/compat/database'
import 'firebase/compat/firestore'
import 'firebase/compat/analytics'
import {getDatabase} from 'firebase/database';
import {getAuth, GoogleAuthProvider} from "firebase/auth"
import {getStorage} from 'firebase/storage';


const firebaseConfig = {
    apiKey: "AIzaSyDFZcBgJ4PlMSKt4N9J3_m3yoyJXCqNZfE",
    authDomain: "postman-5017b.firebaseapp.com",
    databaseURL: "https://postman-5017b-default-rtdb.firebaseio.com",
    projectId: "postman-5017b",
    storageBucket: "postman-5017b.appspot.com",
    messagingSenderId: "674415049849",
    appId: "1:674415049849:web:8ae345cdd2448d2718e8a8",
    measurementId: "G-BXB3QXS65H"
};


const dataUser = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

export const database = firebase.database();
export const app = dataUser
export const dataApp = getDatabase(app)
export const auth = getAuth(app)
export const storage = getStorage(app)
export const provider = new GoogleAuthProvider()
export default firebase