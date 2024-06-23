const express = require("express");
const path = require("path");
const mongodb = require("./db/mongo");
const session = require('express-session');
require('dotenv').config();

// Initialisation de la connexion à MongoDB
mongodb.initClientDbConnection();

const app = express();

// Middleware pour le corps des requêtes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

app.use(session({
    secret: process.env.SECRET_KEY || 'GTGh6rdP54GT76',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  }));

// Route principale (à partir de indexRouter)
const indexRouter = require("./src/routes/index");
app.use("/", indexRouter);

module.exports = app;
