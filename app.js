const express = require("express");
const path = require("path");
const mongodb = require("./db/mongo");
const methodOverride = require('method-override');

// Initialisation de la connexion à MongoDB
mongodb.initClientDbConnection();

const app = express();

// Middleware pour le corps des requêtes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware pour méthode override
app.use(methodOverride('_method'));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// Route principale (à partir de indexRouter)
const indexRouter = require("./src/routes/index");
app.use("/", indexRouter);

module.exports = app;
