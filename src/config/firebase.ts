// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyACkDVy6LUX9JR3MckmXd_o1bnWgFvudww',
  authDomain: 'snapchat-clone-assignment-6.firebaseapp.com',
  projectId: 'snapchat-clone-assignment-6',
  storageBucket: 'snapchat-clone-assignment-6.appspot.com',
  messagingSenderId: '552868874917',
  appId: '1:552868874917:web:2db6b0cfb3e3d0e8ce9b4c',
  measurementId: 'G-Z776B1M19Z',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth to use signup and login
export const auth = getAuth(app);

// Initialize Firebase firestore to use database
export const db = getFirestore(app);

// Initialize Firebase storage to use storage
export const storage = getStorage(app);
