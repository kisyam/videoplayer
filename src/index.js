const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const muteBtn = document.getElementById("mute");
const time = document.getElementById("time");
const volume = document.getElementById("volume");
const videoContainer = document.getElementById("videoContainer");
const fullScreenBtn = document.getElementById("fullScreen");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const forward = document.getElementById("forward");
const backward = document.getElementById("backward");

let volumeValue = 0.5;
video.volume = volumeValue;

const handlePlay = (e) => {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
    playBtn.innerText = video.paused ? "Play" : "Pause";
};
const handleMute = (e) => {
    if (video.muted) {
        video.muted = false;
    } else {
        video.muted = true;
    }

    muteBtn.innerText = video.muted ? "UnMute" : "Mute";
    volume.value = video.muted ? 0 : volumeValue;
};

const handleVolume = (event) => {
    const {
        target: { value },
    } = event;
    console.log(value);
    if (value === "0") {
        video.muted = true;
        muteBtn.innerText = "UnMute";
    } else {
        video.muted = false;
        muteBtn.innerText = "Mute";
    }
    volumeValue = value;
    video.volume = value;
};

const handleFullScreen = () => {
    const fullscreen = document.fullscreenElement;
    if (fullscreen) {
        document.exitFullscreen();
    } else {
        video.requestFullscreen();
    }
};

const handleKeyDown = (event) => {
    console.log("keyCode");
    if (event.keyCode === 32) {
        //* Space
        return handlePlay();
    }

    if (event.keyCode === 77) {
        //* M
        return handleMute();
    }

    if (event.keyCode === 70 && !document.fullscreenElement) {
        //* F
        video.requestFullscreen();
    }

    if (event.keyCode === 27 && document.fullscreenElement) {
        //* ESC
        document.exitFullscreen();
    }

    if (event.keyCode === 39) {
        //* ->
        return handleForwardTimeUpdate();
    }

    if (event.keyCode === 37) {
        //* <-
        return handleBackwardTimeUpdate();
    }
};

const formatTime = (seconds) => {
    return new Date(seconds * 1000).toISOString().substring(14, 19);
};

const handleLoadedMetadata = () => {
    totalTime.innerText = formatTime(Math.floor(video.duration));
    time.max = Math.floor(video.duration);
};

const handleTimeUpdate = () => {
    currentTime.innerText = formatTime(Math.floor(video.currentTime));
    time.value = Math.floor(video.currentTime);
};

const handleForwardTimeUpdate = () => {
    currentTime.innerText = formatTime(Math.floor(video.currentTime + 3));
    time.value = Math.floor(video.currentTime + 3);
    video.currentTime = time.value;
};

const handleBackwardTimeUpdate = () => {
    currentTime.innerText = formatTime(Math.floor(video.currentTime - 3));
    time.value = Math.floor(video.currentTime - 3);
    video.currentTime = time.value;
};

const handleTimelineChange = (event) => {
    const {
        target: { value },
    } = event;
    video.currentTime = value;
};

if (video.readyState === 4) {
    handleLoadedMetadata();
} //* totalTime 지연 발생으로 인한 구현

//* ✅ 빨리감기 되감기 구현
//* ✅ 현재 시간 표시
//* ✅ 타임라인(비디오 진행 상태, 클릭 시 점프)
//* ✅ 전체 화면
//* ✅ 단축키: Space를 눌러 일시 중지, 'F'를 눌러 전체 화면 모드로 들어가기, Esc 키를 눌러 전체 화면 모드에서 나오기, 'M'을 눌러 음소거 모드

playBtn.addEventListener("click", handlePlay);
muteBtn.addEventListener("click", handleMute);
volume.addEventListener("input", handleVolume);
video.addEventListener("loadeddata", handleLoadedMetadata);
time.addEventListener("input", handleTimelineChange);
video.addEventListener("timeupdate", handleTimeUpdate);
fullScreenBtn.addEventListener("click", handleFullScreen);
video.addEventListener("dblclick", handleFullScreen);
forward.addEventListener("click", handleForwardTimeUpdate);
backward.addEventListener("click", handleBackwardTimeUpdate);
document.addEventListener("keyup", handleKeyDown);
