const express = require('express');
const cors = require('cors');
const fs = require('fs');
let cars = require('./cars.json').cars;

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Functie om wijzigingen op te slaan naar cars.json
function saveCarsToFile() {
    fs.writeFileSync('./cars.json', JSON.stringify({ cars: cars }, null, 4));
}

// GET alle auto's
app.get('/cars', (req, res) => {
    res.json({ cars });
});

// GET specifieke auto
app.get('/cars/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const car = cars.find(car => car.id === id);
    car ? res.json(car) : res.status(404).json({ message: "Auto niet gevonden" });
});

// POST nieuwe auto toevoegen (ID automatisch + bovenaan)
app.post('/cars', (req, res) => {
    const highestId = cars.reduce((max, car) => (car.id > max ? car.id : max), 0);

    const newCar = {
        id: highestId + 1,
        merk: req.body.merk,
        model: req.body.model,
        bouwjaar: req.body.bouwjaar,
        categorie: req.body.categorie,
        prijs: req.body.prijs,
        description: req.body.description,
        image: req.body.image
    };

    cars.push(newCar);
    saveCarsToFile();
    res.status(201).json(newCar);
});

// PATCH - velden aanpassen (zoals bouwjaar, prijs, etc.)
app.patch('/cars/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const car = cars.find(car => car.id === id);

    if (car) {
        // Loop door alle velden die gestuurd zijn en pas ze aan
        Object.keys(req.body).forEach(key => {
            if (key in car) {
                car[key] = req.body[key];
            }
        });

        saveCarsToFile();
        res.json(car);
    } else {
        res.status(404).json({ message: "Auto niet gevonden" });
    }
});

// PUT - velden volledig overschrijven - deels
app.put('/cars/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const car = cars.find(car => car.id === id);

    if (car) {
        // Loop door alle properties in de body en update de auto
        Object.keys(req.body).forEach(key => {
            if (key in car) {
                car[key] = req.body[key];
            }
        });

        saveCarsToFile(); // Opslaan naar bestand
        res.json(car);
    } else {
        res.status(404).json({ message: "Auto niet gevonden" });
    }
});


// DELETE auto verwijderen
app.delete('/cars/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = cars.findIndex(car => car.id === id);

    if (index !== -1) {
        cars.splice(index, 1);
        saveCarsToFile();
        res.json({ message: "Auto verwijderd" });
    } else {
        res.status(404).json({ message: "Auto niet gevonden" });
    }
});

// Server starten
app.listen(port, () => {
    console.log(`Express draait nu op http://localhost:${port}`);
});
