fetch("IndvOpdracht/cars.json")
    .then(response => response.json())
    .then(data => {
        console.log("JSON data geladen:", data);
        const autoContainer = document.getElementById("auto-container");

        data.forEach(auto => {
            const autoCard = document.createElement("div");
            autoCard.classList.add("auto-card");

            autoCard.innerHTML = `
                <img src="${auto.image}" alt="${auto.merk} ${auto.model}">
                <h3>${auto.merk} ${auto.model}</h3>
                <p><strong>Bouwjaar:</strong> ${auto.bouwjaar}</p>
                <p>${auto.description}</p>
                <a href="#" class="info-button">Meer info</a>
            `;

            autoContainer.appendChild(autoCard);
        });
    })
    .catch(error => console.error("Fout bij laden JSON:", error));
