let currentPage = 1;

const leftPage = document.getElementById("leftPage");
const rightPage = document.getElementById("rightPage");
const themeToggle = document.getElementById("themeToggle");
const leftNumber = document.querySelector(".left .page-number");
const rightNumber = document.querySelector(".right .page-number");
const musicButton = document.getElementById("musicToggle");

// Atualiza o conteúdo e números das páginas
function updatePages() {
  leftPage.value = localStorage.getItem(page_${currentPage}) || "";
  rightPage.value = localStorage.getItem(page_${currentPage + 1}) || "";
  leftNumber.textContent = currentPage;
  rightNumber.textContent = currentPage + 1;
}

// Salva conteúdo da página no localStorage
function savePage(pageNumber, content) {
  localStorage.setItem(page_${pageNumber}, content);
}

// Eventos para salvar textos ao digitar
leftPage.addEventListener("input", () => savePage(currentPage, leftPage.value));
rightPage.addEventListener("input", () => savePage(currentPage + 1, rightPage.value));

// Navegação para página seguinte
document.getElementById("nextPage").addEventListener("click", () => {
  currentPage += 2;
  updatePages();
});

// Navegação para página anterior
document.getElementById("prevPage").addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage -= 2;
    updatePages();
  }
});

// Alternar tema claro/escuro
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

// Inicializa página e tema no carregamento da página
window.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
  }
  themeToggle.style.color = document.body.classList.contains("dark")
    ? "red"
    : "#5b3c11";
  updatePages();
});

// Efeito de corações que flutuam no mousemove
let heartTimeout;
document.addEventListener("mousemove", (e) => {
  if (heartTimeout) clearTimeout(heartTimeout);

  const heart = document.createElement("span");
  heart.classList.add("heart");
  heart.style.left = ${e.pageX - 7}px;
  heart.style.top = ${e.pageY - 7}px;
  document.body.appendChild(heart);

  heartTimeout = setTimeout(() => heart.remove(), 800);
});

// Música
const audio = new Audio("AUD-20250525-WA0002.dat"); // Troque para o caminho correto do áudio
let isPlaying = false;

musicButton.addEventListener("click", () => {
  if (!isPlaying) {
    audio.play();
    isPlaying = true;
    musicButton.textContent = "⏸ Pausar Música";
  } else {
    audio.pause();
    isPlaying = false;
    musicButton.textContent = "🎵 Tocar Música";
  }
});
