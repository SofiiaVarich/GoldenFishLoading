const frameCount = 48;
const framePath = (frame) => `public/assets/fish/fish_loading_frame_${String(frame).padStart(2, "0")}.png`;

const fish = document.querySelector("#fish");
const progressBar = document.querySelector("#progress-bar");
const progress = document.querySelector(".progress");
const status = document.querySelector("#status");
const playToggle = document.querySelector("#play-toggle");
const speed = document.querySelector("#speed");

let frame = 1;
let playing = true;
let lastFrameTime = 0;
let frameDuration = 1000 / Number(speed.value);

const frames = Array.from({ length: frameCount }, (_, index) => {
  const image = new Image();
  image.src = framePath(index + 1);
  return image;
});

const setProgress = (value) => {
  progressBar.style.width = `${value}%`;
  progress.setAttribute("aria-valuenow", String(Math.round(value)));
};

const updateFrame = () => {
  fish.src = frames[frame - 1].src;
  frame = frame === frameCount ? 1 : frame + 1;
};

const animate = (timestamp) => {
  if (playing && timestamp - lastFrameTime >= frameDuration) {
    updateFrame();
    lastFrameTime = timestamp;
  }
  requestAnimationFrame(animate);
};

frames[0].addEventListener("load", () => {
  status.textContent = "Almost there...";
});

frames.forEach((image, index) => {
  image.addEventListener("load", () => {
    setProgress(((index + 1) / frameCount) * 100);
  });
});

frames[0].addEventListener("error", () => {
  status.textContent = "Unable to load the fish animation.";
});

playToggle.addEventListener("click", () => {
  playing = !playing;
  playToggle.textContent = playing ? "Pause animation" : "Play animation";
  playToggle.setAttribute("aria-pressed", String(playing));
  fish.classList.toggle("fish--paused", !playing);
});

speed.addEventListener("input", (event) => {
  frameDuration = 1000 / Number(event.target.value);
});

if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  playing = false;
  playToggle.textContent = "Play animation";
  playToggle.setAttribute("aria-pressed", "false");
  fish.classList.add("fish--paused");
}

requestAnimationFrame(animate);
