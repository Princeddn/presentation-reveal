let slides = [];
let currentSlideIndex = -1;

// === Créer une nouvelle slide ===
function addSlide() {
  const transition = document.getElementById("transition-select").value;
  const slideHTML = `<section data-transition="${transition}"><h2>Nouvelle Slide</h2><p>Contenu ici...</p></section>`;
  slides.push(slideHTML);
  currentSlideIndex = slides.length - 1;
  saveToLocalStorage();
  updateSlideList();
  loadCurrentSlide();
}

// === Supprimer la slide sélectionnée ===
function removeSlide() {
  if (currentSlideIndex >= 0 && slides.length > 0) {
    slides.splice(currentSlideIndex, 1);
    currentSlideIndex = Math.max(0, currentSlideIndex - 1);
    saveToLocalStorage();
    updateSlideList();
    loadCurrentSlide();
  }
}

// === Mettre à jour la liste latérale de slides ===
function updateSlideList() {
  const list = document.getElementById("slide-tabs");
  list.innerHTML = "";
  slides.forEach((slide, index) => {
    const li = document.createElement("li");
    li.textContent = `Slide ${index + 1}`;
    li.classList.toggle("active", index === currentSlideIndex);
    li.onclick = () => {
      saveCurrentSlide();
      currentSlideIndex = index;
      loadCurrentSlide();
    };
    list.appendChild(li);
  });
}

// === Charger le contenu dans la zone de texte ===
function loadCurrentSlide() {
  const textarea = document.getElementById("slide-content");
  textarea.value = slides[currentSlideIndex] || "";
}

// === Enregistrer les modifications dans le tableau ===
function saveCurrentSlide() {
  const textarea = document.getElementById("slide-content");
  if (currentSlideIndex >= 0) {
    slides[currentSlideIndex] = textarea.value;
    saveToLocalStorage();
  }
}

function openImageDialog() {
  document.getElementById("image-dialog").style.display = "block";
}

function closeImageDialog() {
  document.getElementById("image-dialog").style.display = "none";
  document.getElementById("image-url").value = "";
}

function insertImage() {
  const url = document.getElementById("image-url").value;
  if (!url) return;
  const textarea = document.getElementById("slide-content");
  const imgTag = `<img src="${url}" alt="Image" style="max-width:100%;">\n`;
  textarea.value += imgTag;
  slides[currentSlideIndex] = textarea.value;
  saveToLocalStorage();
  closeImageDialog();
  renderPresentation();
}


// === Générer et afficher l’aperçu Reveal.js ===
function renderPresentation() {
  saveCurrentSlide(); // 💾 toujours enregistrer avant l’aperçu

  const previewFrame = document.getElementById("preview-frame");
  const theme = document.getElementById("theme-select").value;
  const transition = document.getElementById("transition-select").value;
  const slideContent = slides.map(s => s).join("\n");

  const html = `
<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <link rel="stylesheet" href="https://unpkg.com/reveal.js/dist/reveal.css">
  <link rel="stylesheet" href="https://unpkg.com/reveal.js/dist/theme/${theme}.css">
</head>
<body>
  <div class="reveal">
    <div class="slides">
      ${slideContent}
    </div>
  </div>
  <script src="https://unpkg.com/reveal.js/dist/reveal.js"><\/script>
  <script>
    Reveal.initialize({
      controls: true,
      progress: true,
      slideNumber: true,
      transition: '${transition}',
      backgroundTransition: 'fade',
      center: true
    });
  <\/script>
</body>
</html>
  `;

  previewFrame.srcdoc = html;
}

// === Sauvegarder dans le localStorage ===
function saveToLocalStorage() {
  const data = {
    slides,
    currentSlideIndex
  };
  localStorage.setItem("revealEditorData", JSON.stringify(data));
}

// === Événement : modification du contenu ===
document.getElementById("slide-content").addEventListener("input", (e) => {
  if (currentSlideIndex >= 0) {
    slides[currentSlideIndex] = e.target.value;
    saveToLocalStorage();
  }
});

// === Événement : changement de thème ou transition ===
document.getElementById("theme-select").addEventListener("change", renderPresentation);
document.getElementById("transition-select").addEventListener("change", renderPresentation);

// === Charger depuis localStorage au démarrage ===
window.addEventListener("DOMContentLoaded", () => {
  const saved = localStorage.getItem("revealEditorData");
  if (saved) {
    const data = JSON.parse(saved);
    slides = data.slides || [];
    currentSlideIndex = data.currentSlideIndex ?? 0;
    updateSlideList();
    loadCurrentSlide();
    renderPresentation();
  }
});
