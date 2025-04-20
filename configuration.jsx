import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBCnZ5DkNDQo5hcYdzyc3aqb9e6qIuR92w",
  authDomain: "projectmanagement-40d1b.firebaseapp.com",
  projectId: "projectmanagement-40d1b",
  storageBucket: "projectmanagement-40d1b.firebasestorage.app",
  messagingSenderId: "334533392477",
  appId: "1:334533392477:web:04cb14b8d0443a7c2ab5b4",
  measurementId: "G-F8RDV67BN3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase();
export { database };