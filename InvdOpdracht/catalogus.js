fetch("cars.json")
    .then(response => response.json())
    .then(data => console.log("JSON data geladen:", data))
    .catch(error => console.error("Fout bij laden JSON:", error));
