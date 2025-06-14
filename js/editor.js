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
