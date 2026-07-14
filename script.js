const CONFIG_URL = "./config/config.json";

let channels = [];

const grid = document.getElementById("channelGrid");
const player = document.getElementById("playerModal");
const title = document.getElementById("channelTitle");
const video = document.getElementById("video");

async function loadChannels(){

    try{

        const response = await fetch(CONFIG_URL + "?t=" + Date.now());

        const data = await response.json();

        document.querySelector(".app-title").innerHTML =
        `<span class="blue">${data.website.name.split(" ")[0]}</span>
         <span class="red">${data.website.name.split(" ").slice(1).join(" ")}</span>`;

        document.querySelector("footer b").innerText =
        data.website.developer;

        if(data.website.logo!=""){
            document.querySelector(".app-logo").src=data.website.logo;
        }

        channels=data.channels;

        createCards();

    }catch(e){

        console.log(e);

    }

}

function createCards(){

grid.innerHTML="";

channels.forEach((ch,index)=>{

grid.innerHTML += `

<div class="channel-card" onclick="openChannel(${index})">

<div class="live-tag">LIVE</div>

<img src="${ch.logo}" alt="${ch.name}">

<h3>${ch.name}</h3>

</div>

`;

});

}

function openChannel(index){

title.innerText = channels[index].name;

player.style.display="block";

playChannel(channels[index].url);

}

document.getElementById("closePlayer").onclick=function(){

video.pause();

player.style.display="none";

};

document.getElementById("fullscreenBtn").onclick=function(){

if(video.requestFullscreen){

video.requestFullscreen();

}

};

document.getElementById("pipBtn").onclick=async function(){

if(document.pictureInPictureEnabled){

await video.requestPictureInPicture();

}

};

document.getElementById("volumeSlider").oninput=function(){

video.volume=this.value/100;

};

document.getElementById("retryBtn").onclick=function(){

const current=title.innerText;

const ch=channels.find(c=>c.name===current);

if(ch){

playChannel(ch.url);

}

};

loadChannels();
