// gallery.js
if (document.getElementById("gallery-placeholder")) {
  fetch("all/gallery/gallery.html")
    .then(response => response.text())
    .then(data => {
      document.getElementById("gallery-placeholder").innerHTML = data;

      // Setup reveal animation on newly added elements
      if (typeof observeRevealElements === "function") {
        observeRevealElements(document.getElementById("gallery-placeholder"));
      }

      // Set up filter logic
      const filterContainer = document.querySelector(".button-group");
      const galleryItems = document.querySelectorAll(".gallery .item");

      if (filterContainer) {
        filterContainer.addEventListener("click", (event) => {
          if (event.target.classList.contains("button")) {
            const activeButton = filterContainer.querySelector(".active");
            if (activeButton) activeButton.classList.remove("active");

            event.target.classList.add("active");
            const filterValue = event.target.getAttribute("data-filter");

            galleryItems.forEach((item) => {
              if (filterValue === '*' || item.classList.contains(filterValue.substring(1))) {
                item.style.display = 'block';
              } else {
                item.style.display = 'none';
              }
            });
          }
        });
      }
    })
    .catch(error => {
      console.error("Error loading gallery:", error);
      document.getElementById("gallery-placeholder").innerHTML = "Failed to load gallery.";
    });
}