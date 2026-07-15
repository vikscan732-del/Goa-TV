import { login, logout, checkLogin } from "./auth.js";

import {
getWebsiteSettings,
saveWebsiteSettings,
getChannels,
addChannel,
updateChannel,
deleteChannel
} from "./firestore.js";

const loginPage=document.getElementById("loginPage");
const dashboard=document.getElementById("dashboard");

const email=document.getElementById("email");
const password=document.getElementById("password");

const loginBtn=document.getElementById("loginBtn");
const logoutBtn=document.getElementById("logoutBtn");

const loginError=document.getElementById("loginError");

const siteName=document.getElementById("siteName");
const developerName=document.getElementById("developerName");
const siteLogo=document.getElementById("siteLogo");

const saveWebsite=document.getElementById("saveWebsite");

const channelContainer=document.getElementById("channelContainer");

const addChannelBtn=document.getElementById("addChannel");

let channels=[];

// Login

loginBtn.onclick=async()=>{

try{

await login(

email.value,

password.value

);

loginError.textContent="";

}catch(e){

loginError.textContent="Invalid Email or Password";

}

};

// Logout

logoutBtn.onclick=async()=>{

await logout();

};

// Check Login

checkLogin(user=>{

if(user){

loginPage.style.display="none";

dashboard.style.display="block";

loadWebsite();

loadChannels();

}else{

loginPage.style.display="flex";

dashboard.style.display="none";

}

});
// ===================================
// Goa TV Live
// admin.js
// Part 2
// ===================================

// Load Website Settings

async function loadWebsite(){

const website = await getWebsiteSettings();

siteName.value = website.name || "";

developerName.value = website.developer || "";

siteLogo.value = website.logo || "";

}

// Save Website Settings

saveWebsite.onclick = async ()=>{

await saveWebsiteSettings({

name: siteName.value,

developer: developerName.value,

logo: siteLogo.value

});

alert("Website Saved");

};

// Load Channels

async function loadChannels(){

channels = await getChannels();

renderChannels();

}

// ===================================
// Goa TV Live
// admin.js
// Part 3
// ===================================

// Render Channels

function renderChannels(){

channelContainer.innerHTML="";

channels.forEach(channel=>{

const box=document.createElement("div");

box.className="channel-item";

box.innerHTML=`

<input
class="channel-name"
placeholder="Channel Name"
value="${channel.name||""}">

<input
class="channel-logo"
placeholder="Logo URL"
value="${channel.logo||""}">

<input
class="channel-url"
placeholder="m3u8 URL"
value="${channel.url||""}">

<label style="display:flex;align-items:center;gap:8px;margin:10px 0;">

<input
class="channel-live"
type="checkbox"
${channel.live?"checked":""}>

LIVE

</label>

<button class="save-btn">

Save

</button>

<button class="delete-btn">

Delete

</button>

`;

const saveBtn=box.querySelector(".save-btn");

const deleteBtn=box.querySelector(".delete-btn");

saveBtn.onclick=async()=>{

await updateChannel(channel.id,{

name:box.querySelector(".channel-name").value,

logo:box.querySelector(".channel-logo").value,

url:box.querySelector(".channel-url").value,

live:box.querySelector(".channel-live").checked

});

alert("Channel Updated");

loadChannels();

};

deleteBtn.onclick=async()=>{

if(!confirm("Delete this channel?")) return;

await deleteChannel(channel.id);

loadChannels();

};

channelContainer.appendChild(box);

});


  // ===================================
// Goa TV Live
// admin.js
// Part 4
// ===================================

// Add Channel

addChannelBtn.onclick = async () => {

    await addChannel({

        name: "New Channel",

        logo: "",

        url: "",

        live: true

    });

    await loadChannels();

};

// Initial Load

window.addEventListener("load", () => {

    checkLogin(user => {

        if (user) {

            loginPage.style.display = "none";

            dashboard.style.display = "block";

            loadWebsite();

            loadChannels();

        } else {

            loginPage.style.display = "flex";

            dashboard.style.display = "none";

        }

    });

});
}
