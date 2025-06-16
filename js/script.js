// === DRAGGABLE WIDGETS ===
function makeDraggable(element) {
  let offsetX = 0, offsetY = 0, isDragging = false;

  element.addEventListener('mousedown', (e) => {
    isDragging = true;
    offsetX = e.clientX - element.getBoundingClientRect().left;
    offsetY = e.clientY - element.getBoundingClientRect().top;
    element.style.zIndex = 1000;
  });

  document.addEventListener('mousemove', (e) => {
    if (isDragging) {
      element.style.left = (e.clientX - offsetX) + 'px';
      element.style.top = (e.clientY - offsetY) + 'px';
    }
  });

  document.addEventListener('mouseup', () => {
    isDragging = false;
  });
}

// === AJOUTER DES WIDGETS PRÉDÉFINIS ===
function addWidget(type) {
  const widget = document.createElement('div');
  widget.className = 'widget';
  widget.style.top = '100px';
  widget.style.left = '100px';

  switch (type) {
    case 'Texte':
      widget.textContent = 'Texte';
      break;
    case 'Vidéo':
      widget.innerHTML = '<video controls width="200"><source src="" type="video/mp4"></video>';
      break;
    case 'Boite':
      widget.style.background = '#ddd';
      widget.textContent = 'Boite';
      break;
    case 'Podcast':
      widget.innerHTML = '<audio controls><source src=""></audio>';
      break;
    case 'Image':
      widget.innerHTML = '<img src="" alt="Image" width="150">';
      break;
  }

  makeDraggable(widget);
  document.getElementById('canvas').appendChild(widget);
}

// === PANEL PERSONNALISÉ (AFFICHAGE / FERMETURE) ===
function toggleCustomWidgetPanel() {
  const panel = document.getElementById('custom-widget-panel');
  panel.style.display = (panel.style.display === 'block') ? 'none' : 'block';
}

// === AFFICHER UNE SECTION DU WIDGET PERSONNALISÉ
function showTab(tab) {
  document.getElementById('tab-html').style.display = (tab === 'html') ? 'block' : 'none';
  document.getElementById('tab-css').style.display = (tab === 'css') ? 'block' : 'none';
  document.getElementById('tab-js').style.display = (tab === 'js') ? 'block' : 'none';
}

// === OUVRIR L'ÉDITEUR PERSONNALISÉ
function addCustomWidget() {
  toggleCustomWidgetPanel();
}

// === PRÉVISUALISER LE CODE DU WIDGET PERSONNALISÉ
function previewCustomWidget() {
  const html = document.getElementById('tab-html').value;
  const css = document.getElementById('tab-css').value;
  const js = document.getElementById('tab-js').value;

  const fullHTML = `
<!DOCTYPE html>
<html><head>
<style>${css}</style>
</head>
<body>
${html}
<script>${js}</script>
</body></html>
  `;

  const previewFrame = document.getElementById('custom-preview');
  previewFrame.srcdoc = fullHTML;
}

// === INSÉRER LE WIDGET PERSONNALISÉ SUR LE CANVAS
function insertCustomWidget() {
  const html = document.getElementById('tab-html').value;
  const css = document.getElementById('tab-css').value;
  const js = document.getElementById('tab-js').value;

  const widget = document.createElement('div');
  widget.className = 'widget';
  widget.style.top = '150px';
  widget.style.left = '150px';

  const iframe = document.createElement('iframe');
  iframe.width = "300";
  iframe.height = "200";
  iframe.srcdoc = `
<!DOCTYPE html>
<html><head><style>${css}</style></head>
<body>${html}<script>${js}<\/script></body></html>
  `;
  iframe.style.border = 'none';
  widget.appendChild(iframe);

  makeDraggable(widget);
  document.getElementById('canvas').appendChild(widget);
  toggleCustomWidgetPanel();
}

// === AJOUT SLIDE (si nécessaire plus tard)
function addSlide() {
  alert("Fonction 'Ajouter slide' non implémentée ici.");
}

// === SAUVEGARDER (placeholder)
function saveCanvas() {
  alert("🗂️ Sauvegarde à implémenter !");
}

// Ouvrir/fermer le panneau
function addCustomWidget() {
  document.getElementById('custom-widget-panel').style.display = 'flex';
}
document.getElementById('cwp-close-btn').onclick = () => {
  document.getElementById('custom-widget-panel').style.display = 'none';
};

// Onglets
document.querySelectorAll('.cwp-tabs button').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.cwp-tabs button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    showTab(btn.dataset.tab);
  });
});
function showTab(tab) {
  document.getElementById('cwp-html').style.display = tab === 'html' ? 'block' : 'none';
  document.getElementById('cwp-css').style.display = tab === 'css'  ? 'block' : 'none';
  document.getElementById('cwp-js').style.display = tab === 'js'    ? 'block' : 'none';
}

// Bouton Prévisualiser
document.getElementById('cwp-preview-btn').onclick = () => {
  const html = document.getElementById('cwp-html').value;
  const css  = document.getElementById('cwp-css').value;
  const js   = document.getElementById('cwp-js').value;
  document.getElementById('cwp-iframe').srcdoc = `
    <!DOCTYPE html>
    <html><head><style>${css}</style></head>
    <body>${html}<script>${js}<\/script></body></html>
  `;
};

// Bouton Insérer
document.getElementById('cwp-insert-btn').onclick = () => {
  const wrapper = document.createElement('div');
  wrapper.className = 'widget';
  wrapper.innerHTML = document.getElementById('cwp-html').value;
  // injecter CSS + JS si besoin
  const style = document.createElement('style');
  style.textContent = document.getElementById('cwp-css').value;
  wrapper.appendChild(style);
  const script = document.createElement('script');
  script.textContent = document.getElementById('cwp-js').value;
  wrapper.appendChild(script);
  // rendre déplaçable
  makeDraggable(wrapper);
  document.getElementById('canvas').appendChild(wrapper);
  // fermer le panneau
  document.getElementById('custom-widget-panel').style.display = 'none';
};
