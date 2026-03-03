import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// In production (Firebase App Hosting), use the hosting domain as authDomain
// so the /__/auth/handler runs on the same origin. This avoids the cross-origin
// storage issue that breaks signInWithPopup/signInWithRedirect when authDomain
// is on a different origin (firebaseapp.com) than the app.
function getAuthDomain(): string {
  if (typeof window !== "undefined") {
    const host = window.location.host;
    if (!host.includes("localhost") && !host.includes("127.0.0.1")) {
      return host;
    }
  }
  return process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ?? "";
}

const firebaseConfig = {
  apiKey:            process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain:        getAuthDomain(),
  projectId:         process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket:     process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId:             process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Surface missing config early — secrets may not be set in Firebase App Hosting
if (typeof window !== "undefined") {
  const missing = Object.entries(firebaseConfig)
    .filter(([, v]) => !v)
    .map(([k]) => k);
  if (missing.length > 0) {
    console.error(
      `[Softly] Firebase config missing: ${missing.join(", ")}. ` +
      "Check that your NEXT_PUBLIC_* secrets are set in Firebase App Hosting (apphosting.yaml)."
    );
  }
}

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db   = getFirestore(app);
