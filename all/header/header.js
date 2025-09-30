// Auto-detect correct header CSS path based on folder depth
const depth = window.location.pathname.split('/').length - 2;
const cssPath = `${'../'.repeat(depth)}all/header/header.css`;

// Load header CSS
const css = document.createElement("link");
css.rel = "stylesheet";
css.href = cssPath;
document.head.appendChild(css);

// Choose which placeholder to use
const target = document.getElementById("header-placeholder") || document.getElementById("header-placeholder-hide");

if (target) {
  fetch("../../../all/header/header.html")
    .then(res => res.text())
    .then(html => {
      target.innerHTML = html;

      // Hide .home-only if using the hidden version
      if (target.id === "header-placeholder-hide") {
        requestAnimationFrame(() => {
          document.querySelectorAll(".home-only").forEach(el => el.style.display = "none");
        });
      }

      // Setup sidebar links *after* header loads
      const links = document.querySelectorAll(".menuhidden a");
      links.forEach(link => link.addEventListener("click", closeSidebar));
    })
    .catch(err => console.error("Header load failed:", err));
}

// Sidebar controls
function showSidebar() {
  document.querySelector(".menuhidden")?.style.setProperty("display", "flex");
  document.getElementById("blur-overlay")?.style.setProperty("display", "block");
  document.querySelector("header")?.classList.add("noblur");
}

function closeSidebar() {
  document.querySelector(".menuhidden")?.style.setProperty("display", "none");
  document.getElementById("blur-overlay")?.style.setProperty("display", "none");
  document.querySelector("header")?.classList.remove("noblur");
}

// Overlay click to close
document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.getElementById("blur-overlay");
  if (overlay) overlay.addEventListener("click", closeSidebar);

  // For static menu links (if any)
  document.querySelectorAll(".menuhidden a").forEach(link =>
    link.addEventListener("click", closeSidebar)
  );
});
