// =======================================
// Goa TV Live
// app.js
// Part 1
// =======================================

import {
  getWebsiteSettings,
  getChannels
} from "./firestore.js";

let channels = [];

const siteLogo = document.getElementById("siteLogo");
const siteName = document.getElementById("siteName");
const developerName = document.getElementById("developerName");

const channelGrid =
document.getElementById("channelGrid");


// ---------------------
// Website Settings
// ---------------------

async function loadWebsite(){

    try{

        const website =
        await getWebsiteSettings();

        siteName.textContent =
        website.name || "Goa TV Live";

        developerName.textContent =
        website.developer || "Vikrant Naik";

        if(
            website.logo &&
            website.logo.trim()!==""
        ){

            siteLogo.src =
            website.logo;

        }

    }catch(err){

        console.log(err);

    }

}

// ---------------------
// Load Channels
// ---------------------

async function loadChannels(){

    try{

        channels =
        await getChannels();

        renderChannels();

    }catch(err){

        console.log(err);

        channelGrid.innerHTML=`
        <div style="
        padding:40px;
        text-align:center;
        color:red;">
        Failed to load channels
        </div>
        `;

    }

}


// =======================================
// Goa TV Live
// app.js
// Part 2
// =======================================

function renderChannels(){

    channelGrid.innerHTML="";

    if(channels.length===0){

        channelGrid.innerHTML=`
        <div style="
        padding:40px;
        text-align:center;
        color:#666;">
        No Channels Available
        </div>
        `;

        return;

    }

    channels.forEach(channel=>{

        const card=document.createElement("div");

        card.className="channel-card";

        card.innerHTML=`

        ${channel.live?`
        <div class="live-badge">
        LIVE
        </div>
        `:""}

        <img
        src="${channel.logo || "assets/default-channel.png"}"
        alt="${channel.name}"
        loading="lazy"
        onerror="this.src='assets/default-channel.png'">

        <h3>${channel.name}</h3>

        `;

        card.onclick=()=>{

            sessionStorage.setItem(

                "selectedChannel",

                JSON.stringify(channel)

            );

            location.href="player.html";

        };

        channelGrid.appendChild(card);

    });

}

// =======================================
// Goa TV Live
// app.js
// Part 3
// =======================================

// ---------------------
// Initialize Website
// ---------------------

async function init(){

    await loadWebsite();

    await loadChannels();

}

// Internet Status

window.addEventListener("offline",()=>{

    alert("No Internet Connection");

});

window.addEventListener("online",()=>{

    init();

});

// Service Worker

if("serviceWorker" in navigator){

    window.addEventListener("load",()=>{

        navigator.serviceWorker.register("./service-worker.js")
        .then(()=>{

            console.log("Service Worker Registered");

        })
        .catch(console.error);

    });

}

// Start Website

init();


