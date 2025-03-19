import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useStore } from "./store";
import {
  FirebaseAuthConsumer,
  FirebaseAuthProvider,
} from "@react-firebase/auth";
import {
  AuthEmission,
  InitializeAppArgs,
} from "@react-firebase/auth/dist/types";
import firebase from "firebase/app";
import "firebase/auth";

import Login from "./pages/Login";
import Main from "./pages/Main";


// Create a QueryClient instance
const queryClient = new QueryClient();



function App() {
  const snap = useStore();

  React.useEffect(() => {}, []);

  React.useEffect(() => {
    console.log("🚀 ~ React.useEffect ~ snap:", snap);
  }, [snap]);

  const firebaseApp: InitializeAppArgs = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
    databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
    firebase: firebase,
  };

  return (
     <QueryClientProvider client={queryClient}>
      <FirebaseAuthProvider {...firebaseApp}>
        <FirebaseAuthConsumer>
          {(ae: AuthEmission) => (
            <>
              {ae.providerId ? (
                <>
                  {ae.user && (
                    <Main user={ae.user} />
                  )}
                  {!ae.user && <Login />}
                </>
              ) : (
                <p>Loading...</p>
              )}
            </>
          )}
        </FirebaseAuthConsumer>
      </FirebaseAuthProvider>
        </QueryClientProvider>
  );
}

export default App;
