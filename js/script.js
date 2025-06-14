function addWidget(type) {
  const widget = document.createElement('div');
  widget.className = 'widget';
  widget.textContent = type;
  widget.style.top = Math.random() * 300 + 'px';
  widget.style.left = Math.random() * 300 + 'px';

  if (type === 'Texte') {
    widget.contentEditable = true;
    widget.style.minWidth = '100px';
    widget.style.minHeight = '40px';
  }

  makeDraggable(widget);
  document.getElementById('canvas').appendChild(widget);
}

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

function addCustomWidget() {
  const html = prompt("Code HTML de ton widget :");
  if (html) {
    const container = document.createElement('div');
    container.className = 'widget';
    container.innerHTML = html;
    makeDraggable(container);
    document.getElementById('canvas').appendChild(container);
  }
}

function saveCanvas() {
  const canvas = document.getElementById('canvas');
  localStorage.setItem('savedCanvas', canvas.innerHTML);
}

window.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('savedCanvas');
  if (saved) {
    document.getElementById('canvas').innerHTML = saved;
    document.querySelectorAll('.widget').forEach(w => makeDraggable(w));
  }
});
function openCustomWidgetModal() {
  document.getElementById("widget-modal").style.display = "flex";
  updatePreview(); // vide au départ
}

function closeModal() {
  document.getElementById("widget-modal").style.display = "none";
}

function updatePreview() {
  const html = document.getElementById("widget-html").value;
  const css = `<style>${document.getElementById("widget-css").value}</style>`;
  const js = `<script>${document.getElementById("widget-js").value}<\/script>`;
  const preview = document.getElementById("widget-preview");
  preview.srcdoc = html + css + js;
}

function insertCustomWidget() {
  const html = document.getElementById("widget-html").value;
  const css = document.getElementById("widget-css").value;
  const js = document.getElementById("widget-js").value;

  const wrapper = document.createElement("div");
  wrapper.className = "widget";
  wrapper.innerHTML = html;
  makeDraggable(wrapper);

  if (css) {
    const style = document.createElement("style");
    style.textContent = css;
    wrapper.appendChild(style);
  }

  if (js) {
    const script = document.createElement("script");
    script.textContent = js;
    wrapper.appendChild(script);
  }

  document.getElementById("canvas").appendChild(wrapper);
  closeModal();
}
