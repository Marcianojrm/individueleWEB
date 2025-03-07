document.addEventListener("DOMContentLoaded", function () {
    let autoData = []; 
    let filteredData = []; 
    let currentPage = 1;
    const itemsPerPage = 5;

    const autoContainer = document.getElementById("auto-container");
    const categoryFilter = document.getElementById("categorie-filter");
    const sortAscBtn = document.getElementById("sort-asc");
    const sortDescBtn = document.getElementById("sort-desc");
    const prevPageBtn = document.getElementById("prevPage");
    const nextPageBtn = document.getElementById("nextPage");
    const pageIndicator = document.getElementById("pageIndicator");

    // Modal references
    const modal = document.getElementById("carModal");
    const closeModal = document.querySelector(".close");
    const modalTitle = document.getElementById("modalTitle");
    const modalDescription = document.getElementById("modalDescription");
    const modalImage = document.getElementById("modalImage");

    fetch("cars.json")
        .then(response => response.json())
        .then(data => {
            autoData = data;
            filteredData = [...autoData];
            displayCars();
        })
        .catch(error => console.error("Fout bij laden JSON:", error));

    function displayCars() {
        autoContainer.innerHTML = "";
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const carsToShow = filteredData.slice(startIndex, endIndex);

        carsToShow.forEach(auto => {
            const autoCard = document.createElement("div");
            autoCard.classList.add("auto-card");

            autoCard.innerHTML = `
                <img src="${auto.image}" alt="${auto.merk} ${auto.model}">
                <div class="auto-info">
                    <h3>${auto.merk} ${auto.model}</h3>
                    <p><strong>Categorie:</strong> ${auto.categorie} | <strong>Bouwjaar:</strong> ${auto.bouwjaar}</p>
                    <p>${auto.description}</p>
                    <a href="#" class="info-button" data-id="${auto.id}">Meer info</a>
                </div>
            `;
            autoContainer.appendChild(autoCard);
        });

        pageIndicator.textContent = `Pagina ${currentPage} van ${Math.ceil(filteredData.length / itemsPerPage)}`;
        prevPageBtn.disabled = currentPage === 1;
        nextPageBtn.disabled = currentPage >= Math.ceil(filteredData.length / itemsPerPage);
    }

    // Open modal with car details
    autoContainer.addEventListener("click", function (e) {
        if (e.target && e.target.classList.contains("info-button")) {

            e.preventDefault();

            const carId = e.target.getAttribute("data-id");
            const car = autoData.find(car => car.id == carId);

            const formatter = new Intl.NumberFormat('nl-NL', {
                style: 'currency',
                currency: 'EUR',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });

            // Update modal with car details
            if (car) {
                modalTitle.textContent = `${car.merk} ${car.model}`;
                modalDescription.textContent = car.description;
                modalImage.src = car.image;
                document.getElementById("modalBouwjaar").textContent = car.bouwjaar;
                document.getElementById("modalCategorie").textContent = car.categorie;
                document.getElementById("modalPrijs").textContent = formatter.format(car.prijs);

                // Show the modal
                modal.style.display = "block";
            }
        }
    });

    // Close the modal when clicking on the close button
    closeModal.addEventListener("click", function () {
        modal.style.display = "none";
    });

    // Close modal when clicking outside of it
    window.addEventListener("click", function (e) {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });

    categoryFilter.addEventListener("change", function () {
        const selectedCategory = categoryFilter.value;
        if (selectedCategory === "all") {
            filteredData = [...autoData];
        } else {
            filteredData = autoData.filter(auto => auto.categorie === selectedCategory);
        }
        currentPage = 1;
        displayCars();
    });

    sortAscBtn.addEventListener("click", function () {
        filteredData.sort((a, b) => a.bouwjaar - b.bouwjaar);
        displayCars();
    });

    sortDescBtn.addEventListener("click", function () {
        filteredData.sort((a, b) => b.bouwjaar - a.bouwjaar);
        displayCars();
    });

    prevPageBtn.addEventListener("click", function () {
        if (currentPage > 1) {
            currentPage--;
            displayCars();
        }
    });

    nextPageBtn.addEventListener("click", function () {
        if (currentPage < Math.ceil(filteredData.length / itemsPerPage)) {
            currentPage++;
            displayCars();
        }
    });
});
