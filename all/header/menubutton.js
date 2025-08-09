function showSidebar() {
  document.querySelector(".menuhidden").style.display = "flex";
  document.getElementById("blur-overlay").style.display = "block";
  document.querySelector("header")?.classList.add("noblur");

  // Re-bind close handler for dynamic menu items
  const menuLinks = document.querySelectorAll(".menuhidden a");
  menuLinks.forEach(link => {
    link.addEventListener("click", closeSidebar);
  });
}

function closeSidebar() {
  document.querySelector(".menuhidden").style.display = "none";
  document.getElementById("blur-overlay").style.display = "none";
  document.querySelector("header")?.classList.remove("noblur");
}

document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.getElementById("blur-overlay");
  if (overlay) {
    overlay.addEventListener("click", closeSidebar);
  } else {
    console.warn("#blur-overlay not found when script ran.");
  }

  // Optional: only if menu links are present from the start
  const staticMenuLinks = document.querySelectorAll(".menuhidden a");
  staticMenuLinks.forEach(link => {
    link.addEventListener("click", closeSidebar);
  });
});