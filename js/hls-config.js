// Goa TV Live
// Simple HLS Player

let hls = null;

function createPlayer(video, url) {

    if (hls) {
        hls.destroy();
        hls = null;
    }

    video.pause();
    video.removeAttribute("src");
    video.load();

    if (!url) {
        alert("Stream URL is empty.");
        return null;
    }

    if (url.includes("youtube.com") || url.includes("youtu.be")) {
        window.open(url, "_blank");
        return null;
    }

    if (Hls.isSupported()) {

        hls = new Hls({
            enableWorker: true,
            lowLatencyMode: true
        });

        hls.loadSource(url);

        hls.attachMedia(video);

        hls.on(Hls.Events.MANIFEST_PARSED, function () {

            video.play().catch(function (e) {
                console.log(e);
            });

        });

        hls.on(Hls.Events.ERROR, function (event, data) {

            console.log("HLS ERROR", data);

            if (data.fatal) {

                switch (data.type) {

                    case Hls.ErrorTypes.NETWORK_ERROR:

                        console.log("Retry Network");

                        hls.startLoad();

                        break;

                    case Hls.ErrorTypes.MEDIA_ERROR:

                        console.log("Recover Media");

                        hls.recoverMediaError();

                        break;

                    default:

                        hls.destroy();

                        hls = null;

                        break;

                }

            }

        });

        return hls;

    }

    if (video.canPlayType("application/vnd.apple.mpegurl")) {

        video.src = url;

        video.play().catch(function (e) {
            console.log(e);
        });

    }

    return null;

}
