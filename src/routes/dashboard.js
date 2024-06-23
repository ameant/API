const express = require("express");
const router = express.Router();
const path = require('path');

// Route pour le tableau de bord
router.get("/", (req, res) => {
  // Utilisation de path.join pour déterminer le chemin absolu du fichier dashboard.html
  const dashboardPath = path.join(__dirname, '../../public/dashboard.html');
  res.sendFile(dashboardPath);
});

module.exports = router;
