// auth.js
const express = require("express");
const router = express.Router();

// Route de connexion (POST /auth/login)
router.post("/dashboard", (req, res) => {
  const { email, password } = req.body;

  // Vérifier les informations d'identification (à implémenter selon vos besoins)
  if (email === "capitainerie@exemple.com" && password === "capitaine.ADMIN") {
    // Authentification réussie
    res.render('dashboard');

  } else {
    // Authentification échouée
    res.status(401).json({ message: "Email ou mot de passe incorrect" });
  }
});

module.exports = router;
