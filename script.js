let currentPage = 1;

const leftPage = document.getElementById("leftPage");
const rightPage = document.getElementById("rightPage");
const themeToggle = document.getElementById("themeToggle");
const leftNumber = document.querySelector(".left .page-number");
const rightNumber = document.querySelector(".right .page-number");

function updatePages() {
  leftPage.value = localStorage.getItem(`page_${currentPage}`) || "";
  rightPage.value = localStorage.getItem(`page_${currentPage + 1}`) || "";
  leftNumber.textContent = currentPage;
  rightNumber.textContent = currentPage + 1;
}

function savePage(pageNumber, content) {
  localStorage.setItem(`page_${pageNumber}`, content);
}

leftPage.addEventListener("input", () => savePage(currentPage, leftPage.value));
rightPage.addEventListener("input", () =>
  savePage(currentPage + 1, rightPage.value)
);

document.getElementById("nextPage").addEventListener("click", () => {
  currentPage += 2;
  updatePages();
});

document.getElementById("prevPage").addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage -= 2;
    updatePages();
  }
});

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  themeToggle.style.color = document.body.classList.contains("dark")
    ? "red"
    : "#5b3c11";
  localStorage.setItem(
    "theme",
    document.body.classList.contains("dark") ? "dark" : "light"
  );
});

window.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
  }
  themeToggle.style.color = document.body.classList.contains("dark")
    ? "red"
    : "#5b3c11";
  updatePages();
});

// Hearts trail
document.addEventListener("mousemove", (e) => {
  const heart = document.createElement("span");
  heart.classList.add("heart");
  heart.style.left = `${e.pageX}px`;
  heart.style.top = `${e.pageY}px`;
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 25);
});
let heartTimeout;

document.addEventListener("mousemove", (e) => {
  if (heartTimeout) clearTimeout(heartTimeout);

  const heart = document.createElement("span");
  heart.classList.add("heart");
  heart.style.left = `${e.pageX - 7}px`;
  heart.style.top = `${e.pageY - 7}px`;
  document.body.appendChild(heart);

  heartTimeout = setTimeout(() => heart.remove(), 25);
});

// Música
const audio = new Audio("AUD-20250525-WA0002.dat"); // nome do arquivo
let isPlaying = false;

const musicButton = document.createElement("button");
musicButton.textContent = "🎵 Tocar Música";
musicButton.style.position = "fixed";
musicButton.style.bottom = "20px";
musicButton.style.left = "50%";
musicButton.style.transform = "translateX(-50%)";
musicButton.style.padding = "10px 20px";
musicButton.style.backgroundColor = "#ffcc00";
musicButton.style.border = "none";
musicButton.style.borderRadius = "5px";
musicButton.style.cursor = "pointer";
musicButton.style.fontWeight = "bold";
document.body.appendChild(musicButton);

musicButton.addEventListener("click", () => {
  if (!isPlaying) {
    audio.play();
    isPlaying = true;
    musicButton.textContent = "⏸️ Pausar Música";
  } else {
    audio.pause();
    isPlaying = false;
    musicButton.textContent = "🎵 Tocar Música";
  }
});
// Mensagem especial (salva localmente)
const dedicatory = document.getElementById("dedicatory");

dedicatory.value = localStorage.getItem("dedicatory") || "";

dedicatory.addEventListener("input", () => {
  localStorage.setItem("dedicatory", dedicatory.value);
});
