const express = require("express");
const router = express.Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");

/**
 * Gestionnaire de route pour la connexion
 * @param {express.Request} req Objet de requête Express contenant les informations d'identification de l'utilisateur
 * @param {express.Response} res Objet de réponse Express utilisé pour envoyer les réponses de connexion
 */
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res
        .status(401)
        .json({ message: "Email ou mot de passe incorrect" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    res.cookie("token", token, { httpOnly: true });
    res.status(200).json({ message: "Connexion réussie", token });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Erreur du serveur lors de l'authentification" });
  }
});

module.exports = router;
