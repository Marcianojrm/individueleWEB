document.addEventListener("DOMContentLoaded", function () {
    const deleteCarSelect = document.getElementById("deleteCarSelect");
    const deleteCarButton = document.getElementById("deleteCarButton");
    const addCarForm = document.getElementById("addCarForm");
    const imageUpload = document.getElementById("imageUpload");
    const previewImage = document.getElementById("previewImage");
    const bouwjaarInput = document.getElementById("bouwjaar");

    let uploadedImagePath = "";  // Hier wordt de bestandsnaam opgeslagen

   
    //  Laad bestaande auto's in de dropdown
    function fetchCars() {
        fetch("http://localhost:3000/cars")
            .then(response => response.json())
            .then(data => {
                deleteCarSelect.innerHTML = '<option value="">-- Kies een auto --</option>';
                data.cars.forEach(car => {
                    const option = document.createElement("option");
                    option.value = car.id;
                    option.textContent = `${car.merk} ${car.model} (${car.bouwjaar})`;
                    deleteCarSelect.appendChild(option);
                });
            })
            .catch(error => {
                console.error("Fout bij laden auto's:", error);
                showPopup("Fout bij laden auto's", true);
            });
    }

    //  Afbeelding kiezen en preview tonen
    imageUpload.addEventListener("change", function (event) {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                previewImage.src = e.target.result;
                previewImage.style.display = "block";
            };
            reader.readAsDataURL(file);

            // Sla alleen de bestandsnaam op, zodat de afbeelding uit de "pictures" map komt
            uploadedImagePath = `pictures/${file.name}`;
        }
    });

    //  Auto toevoegen

    addCarForm.addEventListener("submit", function (e) {
        e.preventDefault();
    
        fetch("http://localhost:3000/cars")
            .then(response => response.json())
            .then(data => {
                const highestId = data.cars.reduce((max, car) => Math.max(max, parseInt(car.id)), 0);
                const newId = highestId + 1; // ID blijft een getal
    
                const newCar = {
                    id: Number(newId),  // Nu wordt het een numeriek ID
                    merk: document.getElementById("merk").value,
                    model: document.getElementById("model").value,
                    bouwjaar: parseInt(document.getElementById("bouwjaar").value),
                    categorie: document.getElementById("categorie").value,
                    prijs: parseFloat(document.getElementById("prijs").value),
                    description: document.getElementById("description").value,
                    image: uploadedImagePath || "pictures/default.jpg"
                };
    
                return fetch("http://localhost:3000/cars", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(newCar)
                });
            })
            .then(() => {
                fetchCars();  
                addCarForm.reset();
                previewImage.style.display = "none";
                showPopup("Auto toegevoegd!"); 
            })
            .catch(error => {
                console.error("Fout bij toevoegen auto:", error);
                showPopup("Fout bij toevoegen auto ", true);
            });
    });
    


    // Auto verwijderen
    deleteCarButton.addEventListener("click", function () {
        const carId = deleteCarSelect.value;
        if (!carId) {
            showPopup("Selecteer een auto om te verwijderen!", true);
            return;
        }

        fetch(`http://localhost:3000/cars/${carId}`, { method: "DELETE" })
            .then(() => {
                fetchCars();
                showPopup("Auto verwijderd!"); 
            })
            .catch(error => {
                console.error("Fout bij verwijderen auto:", error);
                showPopup("Fout bij verwijderen auto", true);
            });
    });


    function showPopup(message, isError = false) {
        console.log("showPopup aangeroepen met bericht:", message, "isError:", isError); // Debug-log
        const popup = document.getElementById("popupNotification");
        const popupMessage = document.getElementById("popupMessage");
    
        popupMessage.textContent = message;
        popup.classList.toggle("error", isError);
        popup.classList.add("show");
    
        clearTimeout(window.popupTimeout);
        window.popupTimeout = setTimeout(() => {
            popup.classList.remove("show");
        }, 10000);
    }
    
    // Sluit popup handmatig
    document.getElementById("closePopup").addEventListener("click", function () {
        const popup = document.getElementById("popupNotification");
        popup.classList.remove("show");
        clearTimeout(window.popupTimeout);
    });

    bouwjaarInput.addEventListener("input", function () {
        let waarde = bouwjaarInput.value;

        // Zorg dat alleen cijfers ingevoerd worden
        waarde = waarde.replace(/\D/g, "");

        // Beperk de lengte tot 4 cijfers
        if (waarde.length > 4) {
            waarde = waarde.slice(0, 4);
        }

        bouwjaarInput.value = waarde;
    });

    // Controleer of er precies 4 cijfers zijn ingevuld bij het verzenden
    document.getElementById("addCarForm").addEventListener("submit", function (e) {
        if (bouwjaarInput.value.length !== 4) {
            e.preventDefault();
            alert("Het bouwjaar moet precies 4 cijfers bevatten!");
        }
    }
    );
    
    

    fetchCars(); // Initieel laden van auto's
});
