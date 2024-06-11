const mongoose = require("mongoose");

// Define the product schema
const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  productStock: {
    type: Number,
    required: true,
  },
  productUniqueId: {
    type: String,
    required: true,
    unique: true,
  },
  productDescription: {
    type: String,
    required: true,
  },
  productRegularPrice: {
    type: Number,
    required: true,
  },
  productOffer: {
    type: Number,
    default: 0, // Default value if no offer is provided
  },
  productTag: {
    type: [String], // Array of strings
    default: [],
  },
  images: {
    type: [String], // Array of image links (strings)
    default: [],
  },
  productLive: {
    type: Boolean,
    default: true, // Default value is true
  },
  productCode: {
    type: String,
    required: true, // Assuming this is required
  },
  productTP: {
    type: Number,
    required: true, // Assuming this is required
  },
  productMRP: {
    type: Number,
    required: true, // Assuming this is required
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category", // Reference to the Category model
    required: true,
  },
});

// Create the Product model using the product schema
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
