// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";
import { getFunctions, httpsCallable } from "firebase/functions";
import { getDatabase } from "firebase/database";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBW8A2Rd9sIOMomQ9ctqqV_iN7pTKRKt6w",
  authDomain: "gym-app-15389.firebaseapp.com",
  projectId: "gym-app-15389",
  databaseURL:"https://gym-app-15389-default-rtdb.asia-southeast1.firebasedatabase.app/",
  storageBucket: "gym-app-15389.firebasestorage.app",
  messagingSenderId: "267921634532",
  appId: "1:267921634532:web:0098131f10e6a177ac28f1"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const database = getDatabase(app);

export default database;

export const db = getFirestore(app);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

const functions = getFunctions(app);

// Panggil fungsi untuk mendapatkan token
export const getFirebaseToken = async (clerkUserId) => {
  const createFirebaseToken = httpsCallable(functions, 'createFirebaseToken');
  try {
    const response = await createFirebaseToken({ clerkUserId });
    return response.data.firebaseToken;
  } catch (error) {
    console.error('Error getting Firebase token:', error);
    throw error;
  }
};