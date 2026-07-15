import { db } from "./firebase.js";

import {

collection,

getDocs,

addDoc,

updateDoc,

deleteDoc,

doc

} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

export async function getChannels(){

const snapshot = await getDocs(collection(db,"channels"));

const list=[];

snapshot.forEach(d=>{

list.push({

id:d.id,

...d.data()

});

});

return list;

}

export async function addChannel(data){

await addDoc(collection(db,"channels"),data);

}

export async function updateChannel(id,data){

await updateDoc(doc(db,"channels",id),data);

}

export async function deleteChannel(id){

await deleteDoc(doc(db,"channels",id));

}
