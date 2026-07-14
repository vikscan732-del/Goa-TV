// ==========================
// Goa TV Live
// player.js - Part 1
// ==========================

let player = null;

const video = document.getElementById("video");

const loading = document.getElementById("loading");

const channelName =
document.getElementById("channelName");

const backBtn =
document.getElementById("backBtn");

const fullscreenBtn =
document.getElementById("fullscreenBtn");

const pipBtn =
document.getElementById("pipBtn");

const volume =
document.getElementById("volume");

const lowBtn =
document.getElementById("lowBtn");

const highBtn =
document.getElementById("highBtn");

let currentChannel = null;

function startPlayer(){

    const saved =
    sessionStorage.getItem("selectedChannel");

    if(!saved){

        alert("No Channel Selected");

        window.location.href="index.html";

        return;

    }

    currentChannel =
    JSON.parse(saved);

    channelName.innerText =
    currentChannel.name;

    loading.style.display="flex";

    player =
    createPlayer(video,currentChannel.url);

}

backBtn.onclick=function(){

    window.location.href="index.html";

};

video.addEventListener("playing",()=>{

    loading.style.display="none";

});

video.addEventListener("waiting",()=>{

    loading.style.display="flex";

});

video.addEventListener("stalled",()=>{

    loading.style.display="flex";

});

video.addEventListener("error",()=>{

    loading.style.display="flex";

});

startPlayer();

// ==========================
// Goa TV Live
// player.js - Part 2
// ==========================

// Full Screen

fullscreenBtn.addEventListener("click", () => {

    if (video.requestFullscreen) {

        video.requestFullscreen();

    } else if (video.webkitRequestFullscreen) {

        video.webkitRequestFullscreen();

    }

});

// Picture in Picture

pipBtn.addEventListener("click", async () => {

    try {

        if (document.pictureInPictureEnabled) {

            await video.requestPictureInPicture();

        }

    } catch (err) {

        console.log(err);

    }

});

// Volume

volume.addEventListener("input", () => {

    video.volume = volume.value / 100;

});

// Quality Buttons (UI)

lowBtn.addEventListener("click", () => {

    lowBtn.style.background = "#1976d2";
    lowBtn.style.color = "#fff";

    highBtn.style.background = "#eee";
    highBtn.style.color = "#000";

    console.log("Low Data Mode");

});

highBtn.addEventListener("click", () => {

    highBtn.style.background = "#1976d2";
    highBtn.style.color = "#fff";

    lowBtn.style.background = "#eee";
    lowBtn.style.color = "#000";

    console.log("High Quality Mode");

});

// Retry when Internet Returns

window.addEventListener("online", () => {

    console.log("Internet Restored");

    if (currentChannel) {

        createPlayer(video, currentChannel.url);

    }

});

// Pause when Offline

window.addEventListener("offline", () => {

    alert("Internet connection lost.");

});

// Retry on Video Error

video.addEventListener("error", () => {

    if (currentChannel) {

        setTimeout(() => {

            createPlayer(video, currentChannel.url);

        }, 2000);

    }

});

