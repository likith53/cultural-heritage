// gallery.js - Displays images with filtering and search

// Sample data - locally stored metadata for images
const archiveItems = [{
        id: 1,
        category: "artifact",
        title: "Ancient Pottery",
        description: "A beautifully decorated ancient pottery piece.",
        filename: "artifact1.jpg",
    },
    {
        id: 2,
        category: "manuscript",
        title: "Handwritten Manuscript",
        description: "A rare manuscript from the 15th century.",
        filename: "manuscript1.jpg",
    },
    {
        id: 3,
        category: "painting",
        title: "Traditional Painting",
        description: "A painting depicting cultural traditions.",
        filename: "painting1.jpg",
    },
    // Add more entries following the pattern
];

// Elements
const galleryGrid = document.getElementById("galleryGrid");
const filterSelect = document.getElementById("filterSelect");
const searchInput = document.getElementById("searchInput");

// Render gallery items based on filter and search
function renderGallery() {
    const filter = filterSelect.value;
    const searchTerm = searchInput.value.toLowerCase();

    const filteredItems = archiveItems.filter((item) => {
        const matchesCategory = filter === "all" || item.category === filter;
        const matchesSearch =
            item.title.toLowerCase().includes(searchTerm) ||
            item.description.toLowerCase().includes(searchTerm);
        return matchesCategory && matchesSearch;
    });

    galleryGrid.innerHTML = "";

    if (filteredItems.length === 0) {
        galleryGrid.innerHTML = "<p>No items match your search/filter criteria.</p>";
        return;
    }

    filteredItems.forEach((item) => {
        const card = document.createElement("div");
        card.className = "card";
        card.tabIndex = 0;

        const img = document.createElement("img");
        img.src = `assets/images/${item.filename}`;
        img.alt = `${item.title} - ${item.description}`;
        img.className = "responsive-img";

        const title = document.createElement("h3");
        title.textContent = item.title;

        const desc = document.createElement("p");
        desc.textContent = item.description;

        const downloadLink = document.createElement("a");
        downloadLink.href = `assets/downloads/${item.filename}`;
        downloadLink.download = item.filename;
        downloadLink.textContent = "Download";
        downloadLink.setAttribute("aria-label", `Download ${item.title}`);

        card.appendChild(img);
        card.appendChild(title);
        card.appendChild(desc);
        card.appendChild(downloadLink);

        galleryGrid.appendChild(card);
    });
}

// Event Listeners
filterSelect.addEventListener("change", renderGallery);
searchInput.addEventListener("input", renderGallery);

// Initial render
renderGallery();