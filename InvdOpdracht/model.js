document.addEventListener("DOMContentLoaded", function () {
    const carModal = document.getElementById("car-modal");
    const closeModal = document.getElementById("close-modal");

    // Functie om de modal te openen met auto-informatie
    function openModal(auto) {
        const modalImage = document.getElementById("modal-image");
        const modalTitle = document.getElementById("modal-title");
        const modalDescription = document.getElementById("modal-description");
        const modalCategory = document.getElementById("modal-category");
        const modalYear = document.getElementById("modal-year");

        // Vul de modal met de auto-informatie
        modalImage.src = auto.image;
        modalTitle.textContent = auto.title;
        modalDescription.textContent = auto.description;
        modalCategory.textContent = auto.category;
        modalYear.textContent = auto.year;

        // Laat de modal zien
        carModal.style.display = "flex";
    }
    
    // Modal sluiten als er buiten de modal wordt geklikt
    window.addEventListener("click", function (event) {
        if (event.target === carModal) {
            carModal.style.display = "none";
        }
    });

    // Voeg eventlistener toe voor "Lees meer" knoppen
    const leesMeerKnoppen = document.querySelectorAll(".open-modal");
    leesMeerKnoppen.forEach(button => {
        button.addEventListener("click", function (event) {
            // Voorkom dat de link de pagina probeert te navigeren
            event.preventDefault();

            // Haal de auto-informatie op uit de bijbehorende .car element
            const carElement = event.target.closest(".car");
            const auto = {
                image: carElement.getAttribute("data-image"),
                title: carElement.getAttribute("data-title"),
                description: carElement.getAttribute("data-description"),
                category: carElement.getAttribute("data-category"),
                year: carElement.getAttribute("data-year")
            };

            // Open de modal met de auto-informatie
            openModal(auto);
        });
    });
});
