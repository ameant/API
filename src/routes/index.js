const express = require('express');
const router = express.Router();
const path = require('path')

const userRoute = require("./users");
const authRoute = require("./auth");
const dashboardRoute = require("./dashboard");
const catwayRoute = require("./catways");

// Page d'accueil
router.get("/", (req, res) => {
  res.render("index");
});

// Route pour la documentation
router.get("/docs", (req, res) => {
  // Utilisation de path.join pour déterminer le chemin absolu du fichier dashboard.html
  const docPath = path.join(__dirname, "../../docs/index.html");
  res.sendFile(docPath);
});

router.use("/users", userRoute);
router.use("/auth", authRoute);
router.use("/dashboard", dashboardRoute);
router.use("/catways", catwayRoute);

module.exports = router;
