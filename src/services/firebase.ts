import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDuO49S8mFNa7uakoGfFwfips8k1DzFlqk",
  authDomain: "acmessenger-dda3f.firebaseapp.com",
  projectId: "acmessenger-dda3f",
  storageBucket: "acmessenger-dda3f.appspot.com",
  messagingSenderId: "166506161186",
  appId: "1:166506161186:web:4ef1be39e498cbd146167b",
  measurementId: "G-7K9MMLQQMS",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const googleAuthProvider = new GoogleAuthProvider();
