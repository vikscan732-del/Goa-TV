// Firebase Configuration

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const firebaseConfig = {

  apiKey: "AIzaSyB4_fpnlJs6TiJ69E-95GE_upJJ9CETwG0",

  authDomain: "goa-tv-live.firebaseapp.com",

  projectId: "goa-tv-live",

  storageBucket: "goa-tv-live.firebasestorage.app",

  messagingSenderId: "189162496228",

  appId: "1:189162496228:web:db24395dd9ee53a40b0cf1"

};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

export { auth, db };
