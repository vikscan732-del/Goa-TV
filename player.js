/* Goa TV Live Player */

let hls = null;

function playChannel(url){

const video = document.getElementById("video");
const loading = document.getElementById("loading");

loading.style.display="flex";

if(hls){

hls.destroy();

hls=null;

}

if(Hls.isSupported()){

hls = new Hls({

enableWorker:true,

lowLatencyMode:true,

backBufferLength:90,

maxBufferLength:30,

maxMaxBufferLength:60,

liveSyncDurationCount:3,

fragLoadingRetryDelay:1000,

manifestLoadingRetryDelay:1000,

levelLoadingRetryDelay:1000

});

hls.loadSource(url);

hls.attachMedia(video);

hls.on(Hls.Events.MANIFEST_PARSED,function(){

video.play();

loading.style.display="none";

});

hls.on(Hls.Events.ERROR,function(event,data){

if(data.fatal){

switch(data.type){

case Hls.ErrorTypes.NETWORK_ERROR:

hls.startLoad();

break;

case Hls.ErrorTypes.MEDIA_ERROR:

hls.recoverMediaError();

break;

default:

hls.destroy();

break;

}

}

});

}else if(video.canPlayType("application/vnd.apple.mpegurl")){

video.src=url;

video.play();

loading.style.display="none";

}

video.addEventListener("waiting",()=>{

loading.style.display="flex";

});

video.addEventListener("playing",()=>{

loading.style.display="none";

});

video.addEventListener("ended",()=>{

video.play();

});

}

window.addEventListener("online",()=>{

const current=document.getElementById("channelTitle").innerText;

const ch=channels.find(c=>c.name===current);

if(ch){

playChannel(ch.url);

}

});

document.addEventListener("visibilitychange",()=>{

const video=document.getElementById("video");

if(!document.hidden){

video.play().catch(()=>{});

}

});