const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Reservation = new Schema({
  catwayNumber: {
    type: String,
    trim: true,
    required: true,
  },
  clientName: {
    type: String,
    trim: true,
    required: true,
  },
  boatName: {
    type: String,
    trim: true,
    required: true,
  },
  checkIn: {
    type: String,
    trim: true,
    required: true,
  },
  checkOut: {
    type: String,
    trim: true,
    required: true,
  },
});

module.exports = mongoose.model("Reservation", Reservation);
