import * as admin from "firebase-admin";
import path from "path";

const serviceAccount = require(path.join(
  __dirname,
  "../config/fullstack-challenge-5a3f1-firebase-adminsdk-9srrl-98b4b4f17d.json"
));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DB_URL,
});

export const auth = admin.auth();
export const db = admin.firestore();
