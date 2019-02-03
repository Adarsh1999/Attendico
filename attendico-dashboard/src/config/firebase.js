import * as firebase from "firebase";

import { firebaseConfig } from "../config/keys";
firebase.initializeApp(firebaseConfig);

const databaseRef = firebase.database().ref();
export const attendenceRef = databaseRef.child("attendence");
export const authRef = firebase.auth();
export const provider = new firebase.auth.GoogleAuthProvider();