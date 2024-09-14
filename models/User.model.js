const mongoose = require("mongoose");

// Define the schema
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true, // Phone numbers should still be unique
      validate: {
        validator: function (v) {
          return /\d{10}/.test(v); // Adjust regex based on your phone number format requirement
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
  },
  { timestamps: true }
);

// Create the model from the schema
const User = mongoose.model("User", userSchema);

module.exports = User;
