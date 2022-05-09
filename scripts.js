//Get our Elements
const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");
const fullScreen = player.querySelector("#fullscreen");

// build functions
function togglePlay() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

//play and pause button BITNO
function playButton() {
  //toggle.textContent = ">>"; (moze i ovako sa nekim svejerucnim izmenama)TODO

  const icon = this.paused ? "►" : "||";
  toggle.textContent = icon;
}

//TODO
// function pauseButton() {
//   toggle.textContent = "►";
// }

//skip button BITNO
function skip() {
  //console.log(this.dataset.skip); //kada koristimo dataset znamo tacno koji skip elemnt smo kliknuliBITNO
  video.currentTime += parseFloat(this.dataset.skip);
}

//volumePart
function handleRangeUpdate() {
  video[this.name] = this.value;
  //console.log(this.name);
  //console.log(this.value);
}

//time progressVideo
function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

//changeVideoTime
function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}
let mousedown = false;

//EventListeners TODO
// Hook up the event listener
video.addEventListener("click", togglePlay);
video.addEventListener("play", playButton);
video.addEventListener("pause", playButton);
toggle.addEventListener("click", togglePlay);
video.addEventListener("timeupdate", handleProgress);
progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", (e) => mousedown && scrub(e));
progress.addEventListener("mousedown", () => (mousedown = true));
progress.addEventListener("mouseup", () => (mouseup = false));
//fullscreen option
fullScreen.addEventListener("click", () => {
  video.requestFullscreen();
});

//EventListener with forEach
skipButtons.forEach((btn) => btn.addEventListener("click", skip));
ranges.forEach((volume) =>
  volume.addEventListener("change", handleRangeUpdate)
);
ranges.forEach((volume) =>
  volume.addEventListener("mousemove", handleRangeUpdate)
);
