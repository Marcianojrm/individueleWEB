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
                    <a href="#" class="info-button">Meer info</a>
                </div>
            `;
            autoContainer.appendChild(autoCard);
        });

        pageIndicator.textContent = `Pagina ${currentPage} van ${Math.ceil(filteredData.length / itemsPerPage)}`;
        prevPageBtn.disabled = currentPage === 1;
        nextPageBtn.disabled = currentPage >= Math.ceil(filteredData.length / itemsPerPage);
    }

   
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
