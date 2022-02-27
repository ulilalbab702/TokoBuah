import { initializeApp } from "firebase/app";
import { getDatabase } from "@firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyA8e8_6kOcE2SKWm8DykV4hsd81hkcywsc",
  authDomain: "tokobuah-f5455.firebaseapp.com",
  databaseURL: "https://tokobuah-f5455-default-rtdb.firebaseio.com",
  projectId: "tokobuah-f5455",
  storageBucket: "tokobuah-f5455.appspot.com",
  messagingSenderId: "709364797464",
  appId: "1:709364797464:web:a0147beee17be558cdf36d",
  measurementId: "G-XJM48TVGCQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// get database
const database = getDatabase(app);

const FIREBASE = database;

export default FIREBASE;