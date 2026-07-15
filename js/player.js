import Hls from "https://cdn.jsdelivr.net/npm/hls.js@latest/+esm";

const video = document.getElementById("video");
const channelName = document.getElementById("channelName");
const loading = document.getElementById("loading");
const statusText = document.getElementById("statusText");

const backBtn = document.getElementById("backBtn");
const fullscreenBtn = document.getElementById("fullscreenBtn");
const pipBtn = document.getElementById("pipBtn");
const volume = document.getElementById("volume");

let channel = JSON.parse(
sessionStorage.getItem("selectedChannel")
);

let hls = null;

if(!channel){

alert("No channel selected");

location.href="index.html";

}

channelName.textContent = channel.name;

function playStream(url){

loading.style.display="block";

statusText.textContent="Connecting...";

if(hls){

hls.destroy();

hls=null;

}

if(Hls.isSupported()){

hls=new Hls();

hls.loadSource(url);

hls.attachMedia(video);

hls.on(Hls.Events.MANIFEST_PARSED,()=>{

video.play();

});

hls.on(Hls.Events.ERROR,(e,data)=>{

if(data.fatal){

loading.innerHTML="Stream Offline";

statusText.textContent="Unable to play";

}

});

}else if(video.canPlayType("application/vnd.apple.mpegurl")){

video.src=url;

video.play();

}

}

playStream(channel.url);

video.addEventListener("playing",()=>{

loading.style.display="none";

statusText.textContent="LIVE";

});

video.addEventListener("waiting",()=>{

loading.style.display="block";

statusText.textContent="Buffering...";

});
// ===================================
// Goa TV Live
// player.js
// Part 2
// ===================================

// Back

backBtn.addEventListener("click", () => {

    if (hls) {

        hls.destroy();

    }

    window.location.href = "index.html";

});

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

// Retry when internet returns

window.addEventListener("online", () => {

    if (channel && channel.url) {

        playStream(channel.url);

    }

});

// Show offline message

window.addEventListener("offline", () => {

    statusText.textContent = "No Internet";

});

// Cleanup

window.addEventListener("beforeunload", () => {

    if (hls) {

        hls.destroy();

    }

});
                       
