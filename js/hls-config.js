// ============================
// Goa TV Live
// HLS Configuration
// ============================

const HLS_OPTIONS = {

    debug: false,

    enableWorker: true,

    lowLatencyMode: true,

    liveDurationInfinity: true,

    backBufferLength: 90,

    maxBufferLength: 30,

    maxMaxBufferLength: 60,

    maxBufferHole: 0.5,

    highBufferWatchdogPeriod: 2,

    liveSyncDurationCount: 3,

    liveMaxLatencyDurationCount: 10,

    fragLoadingTimeOut: 20000,

    manifestLoadingTimeOut: 20000,

    levelLoadingTimeOut: 20000,

    fragLoadingRetryDelay: 1000,

    manifestLoadingRetryDelay: 1000,

    levelLoadingRetryDelay: 1000,

    fragLoadingMaxRetry: 10,

    manifestLoadingMaxRetry: 10,

    levelLoadingMaxRetry: 10,

    startLevel: -1,

    capLevelToPlayerSize: true,

    autoStartLoad: true

};

// Create HLS Player

function createPlayer(video, url) {

    if (Hls.isSupported()) {

        const hls = new Hls(HLS_OPTIONS);

        hls.loadSource(url);

        hls.attachMedia(video);

        hls.on(Hls.Events.MANIFEST_PARSED, () => {

            video.play().catch(() => {});

        });

        hls.on(Hls.Events.ERROR, function (event, data) {

            if (!data.fatal) return;

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

                    console.log("Restart Player");

                    hls.destroy();

                    createPlayer(video, url);

                    break;

            }

        });

        return hls;

    }

    // Safari Support

    if (video.canPlayType("application/vnd.apple.mpegurl")) {

        video.src = url;

        video.play().catch(() => {});

    }

}
