const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    trim: true,
    required: true,
  },
});

module.exports = mongoose.model("User", User);
