
const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

// Serve the reservations list
router.get('/reservations-list', (req, res) => {
  const filePath = path.join(__dirname, '../reservations.json');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading reservations.json:', err);
      res.status(500).send('Server Error');
      return;
    }
    const reservations = JSON.parse(data);
    res.json(reservations);
  });
});

// Handle creation of new reservation
router.post('/create-reservation', (req, res) => {
  const filePath = path.join(__dirname, '../reservations.json');
  
  // Récupérez les données du formulaire
  const { reservationCatwayNumber, clientName, boatName, checkIn, checkOut } = req.body;

  // Chargez le fichier JSON actuel
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading reservations.json:', err);
      res.status(500).send('Server Error');
      return;
    }

    // Parsez le JSON
    const reservations = JSON.parse(data);

    // Créez une nouvelle réservation
    const newReservation = {
      catwayNumber: reservationCatwayNumber,
      clientName,
      boatName,
      checkIn,
      checkOut
    };

    // Ajoutez la nouvelle réservation à la liste
    reservations.push(newReservation);

    // Écrivez le fichier JSON mis à jour
    fs.writeFile(filePath, JSON.stringify(reservations, null, 2), (err) => {
      if (err) {
        console.error('Error writing reservations.json:', err);
        res.status(500).send('Server Error');
        return;
      }
      // Répondez avec succès
      res.status(201).send('Réservation créée avec succès');
    });
  });
});

module.exports = router;