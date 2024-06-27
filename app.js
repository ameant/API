const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const mongodb = require("./db/mongo");
require('dotenv').config();
const cors = require("cors");

// Initialisation de la connexion à MongoDB
mongodb.initClientDbConnection();

const app = express();

app.use(cors({
  origin: 'http://localhost:3001',
  credentials: true
}));

// Middleware pour le corps des requêtes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Fichiers statiques
app.use(express.static(path.join(__dirname, "public")));

// Route de la page d'accueil
const indexRouter = require("./src/routes/index");
app.use("/", indexRouter);

module.exports = app;
