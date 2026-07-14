const GIST_URL = "https://gist.githubusercontent.com/vikscan732-del/dfc5c1fbf04678bccd40ac930151d8ce/raw/gistfile1.txt";

let channels = [];
let qualityMode = "high";

const player = document.getElementById("playerModal");
const title = document.getElementById("channelTitle");
const video = document.getElementById("video");

async function loadChannels() {
    try {
        const response = await fetch(GIST_URL + "?t=" + Date.now());
        const data = await response.json();
        channels = data.channels;
    } catch (e) {
        console.log("Failed to load channels", e);
    }
}

loadChannels();

document.querySelectorAll(".channel-card").forEach((card, index) => {

    card.onclick = () => {

        if (!channels[index]) return;

        title.innerText = channels[index].name;

        player.style.display = "block";

        playChannel(channels[index].url);

    };

});

document.getElementById("closePlayer").onclick = () => {

    video.pause();

    player.style.display = "none";

};

document.getElementById("lowDataBtn").onclick = () => {

    qualityMode = "low";

    document.getElementById("lowDataBtn").classList.add("active");

    document.getElementById("highQualityBtn").classList.remove("active");

};

document.getElementById("highQualityBtn").onclick = () => {

    qualityMode = "high";

    document.getElementById("highQualityBtn").classList.add("active");

    document.getElementById("lowDataBtn").classList.remove("active");

};

document.getElementById("fullscreenBtn").onclick = () => {

    if (video.requestFullscreen)
        video.requestFullscreen();

};

document.getElementById("pipBtn").onclick = async () => {

    if (document.pictureInPictureEnabled)
        await video.requestPictureInPicture();

};

document.getElementById("volumeSlider").oninput = (e) => {

    video.volume = e.target.value / 100;

};

document.getElementById("retryBtn").onclick = () => {

    const current = title.innerText;

    const ch = channels.find(c => c.name === current);

    if (ch)
        playChannel(ch.url);

};