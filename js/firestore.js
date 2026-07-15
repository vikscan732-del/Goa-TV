import { db } from "./firebase.js";

import {

collection,

getDocs

} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

export async function loadChannels(){

const snapshot = await getDocs(

collection(db,"channels")

);

const channels=[];

snapshot.forEach(doc=>{

channels.push({

id:doc.id,

...doc.data()

});

});

return channels;

}
