// // Import the functions you need from the SDKs you need
// import  firebase  from "firebase/app";
// // import { getAnalytics } from "firebase/analytics";
// // import {getFirestore} from "firebase/firestore"
// import  'firebase/firestore'
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyAXRYlJ5FbZx_5kkzqnth9_ZHhz5kNGjJQ",
//   authDomain: "todo-7a503.firebaseapp.com",
//   projectId: "todo-7a503",
//   storageBucket: "todo-7a503.appspot.com",
//   messagingSenderId: "793167069426",
//   appId: "1:793167069426:web:7ad70499422df3af24506b"
// };

// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);
// export default firebase
// // export const app = initializeApp(firebaseConfig);
// // export const analytics = getAnalytics(app);
// // export const  database = getFirestore(app);


// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAXRYlJ5FbZx_5kkzqnth9_ZHhz5kNGjJQ",
  authDomain: "todo-7a503.firebaseapp.com",
  projectId: "todo-7a503",
  storageBucket: "todo-7a503.appspot.com",
  messagingSenderId: "793167069426",
  appId: "1:793167069426:web:7ad70499422df3af24506b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };
