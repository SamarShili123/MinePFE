import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDOrvfy8bMktIbZ4hQpUSwTbmDITSBuWcY",
  authDomain: "agriculture-stock-management.firebaseapp.com",
  projectId: "agriculture-stock-management",
  storageBucket: "agriculture-stock-management.appspot.com",
  messagingSenderId: "1063374828228",
  appId: "1:1063374828228:web:ec8bf5c8ec73150b528f91"
};

const app = initializeApp(firebaseConfig);

// Initialize Auth
const auth = getAuth(app)

// Initialize Firestore
const firestore = getFirestore(app);

export { app, auth , firestore };
