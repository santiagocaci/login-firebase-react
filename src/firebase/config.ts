// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBYzh-8SjHBZA8mL1dBGqGNLNU7xfZNvjo',
  authDomain: 'react-typescript-firebas-ff0b8.firebaseapp.com',
  projectId: 'react-typescript-firebas-ff0b8',
  storageBucket: 'react-typescript-firebas-ff0b8.appspot.com',
  messagingSenderId: '29730462988',
  appId: '1:29730462988:web:cfc5672a2a3c6aa4237d29',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
