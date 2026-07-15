
// ==========================
// Goa TV Live - app.js
// Part 1
// ==========================

import { loadChannels } from "./firestore.js";

let config = {};
let channels = [];

const grid = document.getElementById("channelGrid");
const siteLogo = document.getElementById("siteLogo");
const siteName = document.getElementById("siteName");
const developerName = document.getElementById("developerName");
const adminBtn = document.getElementById("adminBtn");

// Load website configuration
async function loadConfig() {

    try {

        const response = await fetch(CONFIG_URL + "?t=" + Date.now());

        if (!response.ok) {
            throw new Error("Unable to load config.json");
        }

        config = await response.json();

        if (config.website) {

            siteName.textContent =
                config.website.name || "Goa TV Live";

            developerName.textContent =
                config.website.developer || "Vikrant Naik";

            if (config.website.logo &&
                config.website.logo.trim() !== "") {

                siteLogo.src = config.website.logo;

            }

        }

        channels = await loadChannels();

        renderChannels();

    } catch (err) {

        console.error(err);

        grid.innerHTML = `
        <div style="
            padding:30px;
            text-align:center;
            color:red;
            font-size:18px;">
            Failed to load channels.
        </div>
        `;

    }

}

// Open Admin Panel
adminBtn.addEventListener("click", () => {

    window.location.href = "admin.html";

});

// ==========================
// Goa TV Live - app.js
// Part 2
// Render Channel Cards
// ==========================

function renderChannels() {

    grid.innerHTML = "";

    if (channels.length === 0) {

        grid.innerHTML = `
        <div style="
            width:100%;
            text-align:center;
            padding:40px;
            font-size:18px;
            color:#666;">
            No channels available.
        </div>
        `;

        return;
    }

    channels.forEach((channel, index) => {

        const card = document.createElement("div");

        card.className = "channel-card";

        let liveBadge = "";

        if (channel.live === true) {

            liveBadge = `
            <div class="live-badge">
                LIVE
            </div>
            `;

        }

        card.innerHTML = `

            ${liveBadge}

            <img
                src="${channel.logo}"
                alt="${channel.name}"
                loading="lazy"
                onerror="this.src='assets/default-channel.png'">

            <h3>${channel.name}</h3>

        `;

        card.addEventListener("click", () => {

            openPlayer(index);

        });

        grid.appendChild(card);

    });

}

// ==========================
// Goa TV Live - app.js
// Part 3
// Open Player
// ==========================

function openPlayer(index) {

    if (!channels[index]) {

        alert("Channel not found.");

        return;

    }

    sessionStorage.setItem(
        "selectedChannel",
        JSON.stringify(channels[index])
    );

    window.location.href = "player.html";

}

// ==========================
// Helper Functions
// ==========================

function reloadConfig() {

    loadConfig();

}

function getChannelCount() {

    return channels.length;

}

function getChannel(index) {

    return channels[index];

}

// ==========================
// Goa TV Live - app.js
// Part 4
// Initialization
// ==========================

// Internet Status

window.addEventListener("offline", () => {

    alert("No Internet Connection");

});

window.addEventListener("online", () => {

    loadConfig();

});


// Register Service Worker

if ("serviceWorker" in navigator) {

    window.addEventListener("load", () => {

        navigator.serviceWorker.register("./service-worker.js")
            .then(() => {

                console.log("Service Worker Registered");

            })
            .catch(err => {

                console.log(err);

            });

    });

}

// PWA Install

let deferredPrompt;

window.addEventListener("beforeinstallprompt", (e) => {

    e.preventDefault();

    deferredPrompt = e;

    console.log("PWA Install Available");

});

// Start Website

loadConfig();

console.log("Goa TV Live Loaded");
