const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const confetti = document.getElementById("confetti");

const main = document.getElementById("main");
const celebrationScreen = document.getElementById("celebrationScreen");
const poemScreen = document.getElementById("poemScreen");
const whyScreen = document.getElementById("whyScreen");

const celebrationText = document.getElementById("celebrationText");
const warningText = document.getElementById("warningText");

const penguinImg = document.getElementById("penguinImg");
const catYesImg = document.getElementById("catYesImg");

const poemBtn = document.getElementById("poemBtn");
const whyBtn = document.getElementById("whyBtn");
const poemBackBtn = document.getElementById("poemBackBtn");
const whyBackBtn = document.getElementById("whyBackBtn");

const finalBtn = document.getElementById("finalBtn");
const finalScreen = document.getElementById("finalScreen");

const secretEmoji = document.getElementById("secretEmoji");
const hugCoupon = document.getElementById("hugCoupon");

let noHoverCount = 0;
let wasForcedYes = false;
let poemSeen = false;
let whySeen = false;


const hearts = ["💖","💕","💗","😍"];

/* ===== FALLING HEARTS ===== */
const fallInterval = setInterval(() => {
  const heart = document.createElement("div");
  heart.className = "fall-heart";
  heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.animationDuration = Math.random() * 2 + 4 + "s";
  confetti.appendChild(heart);
  setTimeout(() => heart.remove(), 6000);
}, 120);

/* ===== YES BUTTON ===== */
yesBtn.addEventListener("click", () => {
  clearInterval(fallInterval);
  confetti.innerHTML = "";

  main.style.display = "none";
  celebrationScreen.style.display = "flex";
  poemScreen.style.display = "none";
  whyScreen.style.display = "none";

  catYesImg.style.display = "none";
  penguinImg.style.display = "none";
  penguinImg.classList.remove("shake");

  let text = "YOU’RE STUCK WITH ME NOW ❤️";

  if (wasForcedYes) {
    text += "\nHow dare you say no so many times >:((";
    penguinImg.style.display = "block";
    penguinImg.classList.add("shake");
    typeWriter(celebrationText, text, 45);
  } else {
    celebrationText.textContent = text;
    catYesImg.style.display = "block";
  }
});

/* ===== NO BUTTON ===== */
noBtn.addEventListener("mouseover", () => {
  noHoverCount++;

  const rect = noBtn.getBoundingClientRect();
  const maxX = window.innerWidth - rect.width;
  const maxY = window.innerHeight - rect.height;

  noBtn.style.position = "fixed";
  noBtn.style.left = Math.random() * maxX + "px";
  noBtn.style.top = Math.random() * maxY + "px";

  if (noHoverCount === 3) {
    warningText.textContent = "STOP TRYING, YOU KNOW YOU WANT TO SAY YES!!!!!";
    warningText.style.opacity = "1";
    warningText.style.transform = "scale(1)";
  }

  if (noHoverCount === 6) {
    wasForcedYes = true;
    yesBtn.click();
  }
});

/* ===== NAVIGATION ===== */
poemBtn.addEventListener("click", () => {
  poemSeen = true;              
  checkFinalUnlock(); 

  celebrationScreen.style.display = "none";
  poemScreen.style.display = "flex";
  poemScreen.scrollTop = 0;
  setupScrollFade("poemScreen");
  poemSeen = true;              
  checkFinalUnlock(); 
});

whyBtn.addEventListener("click", () => {
  whySeen = true;               
  checkFinalUnlock();

  celebrationScreen.style.display = "none";
  whyScreen.style.display = "flex";
  whyScreen.scrollTop = 0;
  setupScrollFade("whyScreen");
});

poemBackBtn.addEventListener("click", () => {
  poemScreen.style.display = "none";
  celebrationScreen.style.display = "flex";
});

whyBackBtn.addEventListener("click", () => {
  whyScreen.style.display = "none";
  celebrationScreen.style.display = "flex";
});

finalBtn.addEventListener("click", () => {
  celebrationScreen.style.display = "none";
  finalScreen.style.display = "flex";

  heartExplosion();
});


/* ===== TYPEWRITER ===== */
function typeWriter(el, text, speed) {
  el.textContent = "";
  let i = 0;
  const interval = setInterval(() => {
    el.textContent += text[i];
    i++;
    if (i >= text.length) clearInterval(interval);
  }, speed);
}

function setupScrollFade(screenId) {
  const screen = document.getElementById(screenId);
  const fadeTop = screen.querySelector(".fade-top");
  const fadeBottom = screen.querySelector(".fade-bottom");

  if (!fadeTop || !fadeBottom) return;

  function updateFade() {
    const scrollTop = screen.scrollTop;
    const maxScroll = screen.scrollHeight - screen.clientHeight;

    fadeTop.style.opacity = scrollTop > 10 ? "1" : "0";
    fadeBottom.style.opacity = scrollTop < maxScroll - 10 ? "1" : "0";
  }

  screen.addEventListener("scroll", updateFade);

  // run once when screen opens
  setTimeout(updateFade, 50);
}

function checkFinalUnlock() {
  if (poemSeen && whySeen) {
    finalBtn.disabled = false;
    finalBtn.classList.add("unlocked");
    finalBtn.textContent = "Click This Last 💖";
  }
}

function showFinalScreen() {
  celebrationScreen.style.display = "none";
  poemScreen.style.display = "none";
  whyScreen.style.display = "none";

  finalScreen.style.display = "flex";

  heartExplosion();
}


function heartExplosion() {
  for (let i = 0; i < 20; i++) {
    const heart = document.createElement("div");
    heart.className = "single-explode";
    heart.innerText = "💖";

    heart.style.left = 50 + (Math.random() * 30 - 15) + "%";
    heart.style.top = 50 + (Math.random() * 30 - 15) + "%";

    document.body.appendChild(heart);

    setTimeout(() => heart.remove(), 1200);
  }
}

secretEmoji.addEventListener("click", () => {
  hugCoupon.style.display = "block";
  secretEmoji.textContent = "🦆";
  secretEmoji.style.pointerEvents = "none";
});


if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js");
  });
}
