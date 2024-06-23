// models/catway.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Catway = new Schema({
  catwayNumber: {
    type: String,
    trim: true,
    required: true,
  },
  type: {
    type: String,
    trim: true,
    enum: ["court", "long"],
    required: true,
  },
  catwayState: {
    type: String,
    trim: true,
    enum: ["disponible", "indisponible"],
    required: true,
  },
});

module.exports = mongoose.model('Catway', Catway);
