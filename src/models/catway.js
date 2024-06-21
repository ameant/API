// models/catway.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Catway = new Schema({
  catwayNumber: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["court", "long"],
    required: true,
  },
  catwayState: {
    type: String,
    enum: ["disponible", "indisponible"],
    required: true,
  },
});

module.exports = mongoose.model('Catway', Catway);
