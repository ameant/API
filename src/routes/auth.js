const express = require("express");
const router = express.Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");

// Route de connexion (POST /auth/login)
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(401)
        .json({ message: "Email ou mot de passe incorrect" });
    }

    // Vérification du mot de passe
    if (user.password !== password) {
      return res
        .status(401)
        .json({ message: "Email ou mot de passe incorrect" });
    }

    // Création du token JWT
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    req.session.userId = user._id;

    // Réponse avec le token
    res.redirect("/dashboard");

  } catch (err) {
    console.error("Erreur lors de l'authentification :", err);
    res
      .status(500)
      .json({ message: "Erreur du serveur lors de l'authentification" });
  }
});

module.exports = router;
