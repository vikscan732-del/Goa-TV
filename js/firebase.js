// Firebase SDK

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
getFirestore
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
getAuth
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// Firebase Config

const firebaseConfig = {

apiKey: "AIzaSyB4_fpnlJs6TiJ69E-95GE_upJJ9CETwG0",

authDomain: "goa-tv-live.firebaseapp.com",

projectId: "goa-tv-live",

storageBucket: "goa-tv-live.firebasestorage.app",

messagingSenderId: "189162496228",

appId: "1:189162496228:web:db24395dd9ee53a40b0cf1"

};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = getAuth(app);

export { app, db, auth };

