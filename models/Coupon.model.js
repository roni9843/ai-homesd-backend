const mongoose = require('mongoose');

// Define the coupon schema
const couponSchema = new mongoose.Schema({
  couponCode: {
    type: String,
    required: true,
    unique: true,
  },
  active: {
    type: Boolean,
    default: true,  // By default, the coupon is active
  },
  discountRate: {
    type: Number,
    required: true,
    default: 0,  // Default discount rate is 0
    min: 0       // Ensures no negative discount values
  }
}, { timestamps: true });  // This adds `createdAt` and `updatedAt` timestamps

// Create the model from the schema
const Coupon = mongoose.model('Coupon', couponSchema);

// Export the model
module.exports = Coupon;
