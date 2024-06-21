const path = require('path');
const express = require('express');
const router = express.Router();

// Route de connexion (POST /auth/dashboard)
router.post('/dashboard', (req, res) => {
  const { email, password } = req.body;

  // Vérifier les informations d'identification (à implémenter selon vos besoins)
  if (email === "capitainerie@exemple.com" && password === "capitaine.ADMIN") {
    // Authentification réussie
    res.sendFile(path.join(__dirname, '..', '..', 'public', 'dashboard.html'));
  } else {
    // Authentification échouée
    res.status(401).json({ message: "Email ou mot de passe incorrect" });
  }
});

module.exports = router;
