import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCoITKUdmrvvvhUk6VeMI5AprsvFKC23Vw",
  authDomain: "yaqeen-6a5f0.firebaseapp.com",
  projectId: "yaqeen-6a5f0",
  storageBucket: "yaqeen-6a5f0.firebasestorage.app",
  messagingSenderId: "311478872060",
  appId: "1:311478872060:web:42d8010e2d4ec51b65b479"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

