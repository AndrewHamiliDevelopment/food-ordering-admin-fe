import { useEffect, useState } from "react";
import firebase from "firebase/app";
import "firebase/auth"; // ✅ Import Firebase authentication
import { useStore } from "./store";
import Login from "./pages/Login";
import Main from "./pages/Main";

// ✅ Firebase Config
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
};

// ✅ Initialize Firebase (for v8)
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();

function App() {
  const snap = useStore();
  const [user, setUser] = useState<firebase.User | null>(null); // ✅ Firebase v8 User type

  useEffect(() => {
    console.log("🚀 ~ React.useEffect ~ snap:", snap);
  }, [snap]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return user ? <Main user={user} /> : <Login />;
}

export default App;
