import * as admin from "firebase-admin";

// Initialize the Firebase Admin SDK (should only be done once per project)
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(), // or use `admin.credential.cert` with your service account key file
  });
}

export const auth = admin.auth();
