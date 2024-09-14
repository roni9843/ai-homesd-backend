const mongoose = require("mongoose");

const emailSchema = new mongoose.Schema({
  email: {
    type: String,
    required: false, // Optional field
  },
  phone: {
    type: String,
    required: true, // Required field
  },
  name: {
    type: String,
    required: true, // Required field
  },
  createdDate: {
    type: Date,
    default: Date.now, // Automatically sets the current date and time
  },
  message: {
    type: String,
    required: false, // Optional field
  },
});

const Email = mongoose.model("Email", emailSchema);

module.exports = Email;
