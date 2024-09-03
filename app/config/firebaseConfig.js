// app/config/firebaseConfig.js

import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAQ_6Fomp21O_Qe8tKPY_h92y7Ot-Pc1AM",
  authDomain: "farm-app-26c85.firebaseapp.com",
  projectId: "farm-app-26c85",
  storageBucket: "farm-app-26c85.appspot.com",
  messagingSenderId: "7771349777",
  appId: "1:7771349777:web:1cc1e3df5f5192a900e2b0",
  measurementId: "G-BD539JJ4XY" // Optional
};

// Initialize Firebase app if it has not been initialized already
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const firestore = getFirestore(app);

// Initialize Auth with AsyncStorage for persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export { firestore, auth };
