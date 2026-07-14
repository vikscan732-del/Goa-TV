// Goa TV Live - Simple Player

let player = null;
let currentChannel = null;

const video = document.getElementById("video");
const loading = document.getElementById("loading");
const channelName = document.getElementById("channelName");

const backBtn = document.getElementById("backBtn");
const fullscreenBtn = document.getElementById("fullscreenBtn");
const pipBtn = document.getElementById("pipBtn");
const volume = document.getElementById("volume");

function playCurrentChannel() {

    const saved = sessionStorage.getItem("selectedChannel");

    if (!saved) {

        alert("No Channel Selected");

        window.location.href = "index.html";

        return;

    }

    currentChannel = JSON.parse(saved);

    channelName.textContent = currentChannel.name;

    loading.style.display = "flex";

    player = createPlayer(video, currentChannel.url);

}

backBtn.onclick = function () {

    if (player) {

        try {
            player.destroy();
        } catch (e) {}

    }

    video.pause();

    window.location.href = "index.html";

};

video.addEventListener("playing", function () {

    loading.style.display = "none";

});

video.addEventListener("waiting", function () {

    loading.style.display = "flex";

});

video.addEventListener("error", function () {

    loading.style.display = "flex";

});

fullscreenBtn.onclick = function () {

    if (video.requestFullscreen) {

        video.requestFullscreen();

    } else if (video.webkitRequestFullscreen) {

        video.webkitRequestFullscreen();

    }

};

pipBtn.onclick = async function () {

    try {

        if (document.pictureInPictureEnabled) {

            await video.requestPictureInPicture();

        }

    } catch (e) {

        console.log(e);

    }

};

volume.oninput = function () {

    video.volume = this.value / 100;

};

window.addEventListener("online", function () {

    if (currentChannel) {

        player = createPlayer(video, currentChannel.url);

    }

});

playCurrentChannel();
