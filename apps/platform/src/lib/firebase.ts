import { getApp, getApps, initializeApp, type FirebaseOptions } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

/**
 * La config web Firebase est publique par nature (elle part dans le bundle).
 * La sécurité repose sur les règles Firestore, pas sur ce fichier.
 * Les variables d'env permettent de pointer un autre projet (staging).
 */
const config: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? "AIzaSyBTTqU0GUaRnIbcXUjAVOyGbRfKuCgbeY0",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ?? "leproductengineer-93.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? "leproductengineer-93",
  storageBucket:
    process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ?? "leproductengineer-93.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? "511198920669",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID ?? "1:511198920669:web:bc97a2dc27b4431b620034",
};

export const firebaseApp = getApps().length ? getApp() : initializeApp(config);
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
