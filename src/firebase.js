import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getDatabase} from 'firebase/database'
import {getStorage} from 'firebase/storage'





const firebaseConfig = {
    apiKey: "AIzaSyAgziXGkygJXPW1LS8Z6nQUneiIXRsLikI",
    authDomain: "react-contact-5840b.firebaseapp.com",
    projectId: "react-contact-5840b",
    storageBucket: "react-contact-5840b.appspot.com",
    messagingSenderId: "1032566287370",
    appId: "1:1032566287370:web:8c7a566eeb4a6cb69f83f3"
  };

// const fireDb =firebase.initializeApp(firebaseConfig)
// export default fireDb.database().ref()

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getDatabase(app)
const storage = getStorage(app)
export {app,auth,db,storage}


