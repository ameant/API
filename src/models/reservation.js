const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Catway = require('./catway')

const Reservation = new Schema({
  catwayNumber: {
    type: String,
    required: true,
  },
  clientName: {
    type: String,
    required: true,
  },
  boatName: {
    type: String,
    required: true,
  },
  checkIn: {
    type: String,
    required: true,
  },
  checkOut: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Reservation", Reservation);
