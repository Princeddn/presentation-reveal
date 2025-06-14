let slides = [];
let currentSlideIndex = -1;

// === Créer une nouvelle slide ===
function addSlide() {
  slides.push("<section><h2>Nouvelle Slide</h2><p>Contenu ici...</p></section>");
  currentSlideIndex = slides.length - 1;
  updateSlideList();
  loadCurrentSlide();
}

// === Supprimer la slide sélectionnée ===
function removeSlide() {
  if (currentSlideIndex >= 0 && slides.length > 0) {
    slides.splice(currentSlideIndex, 1);
    currentSlideIndex = Math.max(0, currentSlideIndex - 1);
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

// === Générer et afficher l’aperçu Reveal.js ===
function renderPresentation() {
  const previewFrame = document.getElementById("preview-frame");
  const theme = document.getElementById("theme-select").value;
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
      transition: 'slide',
      backgroundTransition: 'fade',
      center: true
    });
  <\/script>
</body>
</html>
  `;

  previewFrame.srcdoc = html;
}

// === Enregistrer les modifications dans la zone de texte ===
document.getElementById("slide-content").addEventListener("input", (e) => {
  if (currentSlideIndex >= 0) {
    slides[currentSlideIndex] = e.target.value;
  }
});

// === Gérer le changement de thème ===
document.getElementById("theme-select").addEventListener("change", () => {
  renderPresentation();
});
