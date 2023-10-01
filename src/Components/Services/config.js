import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyBKMQyf73aSykzGRaFEx3HnmMgtdl6eftc",
  authDomain: "puntoes-4884b.firebaseapp.com",
  projectId: "puntoes-4884b",
  storageBucket: "puntoes-4884b.appspot.com",
  messagingSenderId: "230857333473",
  appId: "1:230857333473:web:fc4f174a0c0b30395ab5a0"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app)