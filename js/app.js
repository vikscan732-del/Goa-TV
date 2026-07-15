// ===================================
// Goa TV Live
// app.js
// Part 1
// ===================================

import {

getWebsiteSettings,

getChannels

} from "./firestore.js";

let channels = [];

const siteLogo =
document.getElementById("siteLogo");

const siteName =
document.getElementById("siteName");

const developerName =
document.getElementById("developerName");

const grid =
document.getElementById("channelGrid");

const adminBtn =
document.getElementById("adminBtn");

// -----------------------
// Load Website
// -----------------------

async function loadWebsite(){

const website=
await getWebsiteSettings();

siteName.textContent=
website.name || "Goa TV Live";

developerName.textContent=
website.developer || "Vikrant Naik";

if(

website.logo &&

website.logo.trim()!== ""

){

siteLogo.src=
website.logo;

}

}

// -----------------------
// Load Channels
// -----------------------

async function loadAllChannels(){

channels=
await getChannels();

renderChannels();

}

adminBtn.onclick=function(){

window.location.href=
"admin.html";
// ===================================
// Goa TV Live
// app.js
// Part 2
// ===================================

// Render Channels

function renderChannels() {

    grid.innerHTML = "";

    if (channels.length === 0) {

        grid.innerHTML = `
        <div style="
            padding:40px;
            text-align:center;
            color:#666;
            width:100%;">
            No Channels Available
        </div>
        `;

        return;

    }

    channels.forEach(channel => {

        const card = document.createElement("div");

        card.className = "channel-card";

        card.innerHTML = `

            ${channel.live ? `
            <div class="live-badge">
                LIVE
            </div>
            ` : ""}

            <img
            src="${channel.logo || "assets/default-channel.png"}"
            alt="${channel.name}"
            loading="lazy"
            onerror="this.src='assets/default-channel.png'">

            <h3>${channel.name}</h3>

        `;

        card.onclick = function () {

            sessionStorage.setItem(
                "selectedChannel",
                JSON.stringify(channel)
            );

            window.location.href = "player.html";

        };

        grid.appendChild(card);

    });

}
};// ===================================
// Goa TV Live
// app.js
// Part 3
// ===================================

// Start App

async function init() {

    try {

        await loadWebsite();

        await loadAllChannels();

        console.log("Goa TV Live Loaded");

    } catch (err) {

        console.error(err);

        grid.innerHTML = `
        <div style="
            padding:40px;
            text-align:center;
            color:red;
            width:100%;
            font-size:18px;">
            Failed to load website.
        </div>
        `;

    }

}

// Internet Status

window.addEventListener("offline", () => {

    alert("No Internet Connection");

});

window.addEventListener("online", () => {

    init();

});

// Register Service Worker

if ("serviceWorker" in navigator) {

    window.addEventListener("load", () => {

        navigator.serviceWorker
            .register("./service-worker.js")
            .then(() => {

                console.log("Service Worker Registered");

            })
            .catch(console.error);

    });

}

// Start Website

init();




