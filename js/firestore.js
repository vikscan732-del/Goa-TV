import { db } from "./firebase.js";

import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

// ----------------------
// Load Website Settings
// ----------------------

export async function getWebsiteSettings() {

  const ref = doc(db, "settings", "website");

  const snap = await getDoc(ref);

  if (snap.exists()) {
    return snap.data();
  }

  return {
    name: "Goa TV Live",
    developer: "Vikrant Naik",
    logo: ""
  };

}

// ----------------------
// Save Website Settings
// ----------------------

export async function saveWebsiteSettings(data) {

  await setDoc(
    doc(db, "settings", "website"),
    data
  );

}

// ----------------------
// Load Channels
// ----------------------

export async function getChannels() {

  const snapshot =
    await getDocs(collection(db, "channels"));

  const list = [];

  snapshot.forEach(docSnap => {

    list.push({

      id: docSnap.id,

      ...docSnap.data()

    });

  });

  return list;

}

// ----------------------
// Add Channel
// ----------------------

export async function addChannel(data) {

  await addDoc(
    collection(db, "channels"),
    data
  );

}

// ----------------------
// Update Channel
// ----------------------

export async function updateChannel(id, data) {

  await updateDoc(
    doc(db, "channels", id),
    data
  );

}

// ----------------------
// Delete Channel
// ----------------------

export async function deleteChannel(id) {

  await deleteDoc(
    doc(db, "channels", id)
  );

}
