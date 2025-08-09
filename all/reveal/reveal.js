let revealObserver;

function setupRevealObserver() {
  revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      } else {
        entry.target.classList.remove('visible'); // allow re-trigger if needed
      }
    });
  }, { threshold: 0.3 });
}

function observeRevealElements(scope = document) {
  const elements = scope.querySelectorAll('.reveal');
  elements.forEach(el => revealObserver.observe(el));
}

// Expose functions globally (for gallery.js to call)
window.setupRevealObserver = setupRevealObserver;
window.observeRevealElements = observeRevealElements;

document.addEventListener('DOMContentLoaded', () => {
  setupRevealObserver();
  observeRevealElements();
});

