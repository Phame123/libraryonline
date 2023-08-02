// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import {getAuth} from 'firebase/auth'
import {getStorage} from 'firebase/storage'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC_hn6xbenSm3PDFwksFK8EMANg-nhvGQI",
  authDomain: "librarysystem-ba088.firebaseapp.com",
  projectId: "librarysystem-ba088",
  storageBucket: "librarysystem-ba088.appspot.com",
  messagingSenderId: "804159856539",
  appId: "1:804159856539:web:2df2cafcb05ddb69d94b3e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth(app)
export const storage = getStorage(app)


export default app;
