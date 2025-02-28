const mongoose = require('mongoose');

// Define the shipping schema
const shippingSchema = new mongoose.Schema({
  insideDhaka: {
    type: Number,
    required: true,  // Required field for shipping cost inside Dhaka
    min: [0, 'Shipping cost inside Dhaka cannot be negative'],  // Ensure the value is 0 or more
  },
  outsideDhaka: {
    type: Number,
    required: true,  // Required field for shipping cost outside Dhaka
    min: [0, 'Shipping cost outside Dhaka cannot be negative'],  // Ensure the value is 0 or more
  }
}, { timestamps: true });  // Adds `createdAt` and `updatedAt` timestamps

// Create the model from the schema
const Shipping = mongoose.model('Shipping', shippingSchema);

// Export the model
module.exports = Shipping;
