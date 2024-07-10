const express = require("express");
const cookieParser = require("cookie-parser");
const mongodb = require("./db/mongo");
require('dotenv').config();
const cors = require("cors");
const swaggerjsdoc = require('swagger-jsdoc');
const swaggerui = require('swagger-ui-express');

// Initialisation de la connexion à MongoDB
mongodb.initClientDbConnection();

const app = express();

app.use(cors({
  origin: ['http://localhost:3001', 'https://port-de-plaisance-russell.onrender.com'],
  credentials: true
}));

// Middleware pour le corps des requêtes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Documentation de l\'API',
      version: '1.0.0',
      description: "<u>Vue d\'ensemble</u> : Ce projet comporte une page d\'accueil avec un portail de connexion et un lien pour accéder à la documentation API, une page tableau de bord avec 10 formulaires différents ainsi que deux liens pour accéder aux listes. <br/> <u>Tutoriel </u>: Une connexion est nécessaire avant de pouvoir accéder au tableau de bord, certaines routes sont privées et réservées aux utilisateurs connectés. <br/> <u>Exemples</u> : Accessibles dans les catégories ci-dessous. <br/> <u>Glossaire</u> : <strong>API</strong> : Interface de programmation d'application : est une interface logicielle qui permet de « connecter » un logiciel ou un service à un autre logiciel ou service afin d\'échanger des données et des fonctionnalités."
    },
    servers: [
      {
        url: 'http://localhost:3000'
      },
      {
        url: 'https://port-de-plaisance-russell-api.onrender.com'
      }
    ],
  },
  apis: ['./src/routes/*.js'],
};

const specs = swaggerjsdoc(options);

app.use('/api-docs', swaggerui.serve, swaggerui.setup(specs));

// Route de la page d'accueil
const indexRouter = require("./src/routes/index");
app.use("/", indexRouter);

module.exports = app;
