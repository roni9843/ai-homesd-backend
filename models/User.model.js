const mongoose = require("mongoose");

// Define the schema
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 50,
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (v) {
          return /\d{10}/.test(v); // Adjust regex based on your phone number format requirement
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: [/.+@.+\..+/, "Please fill a valid email address"],
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
