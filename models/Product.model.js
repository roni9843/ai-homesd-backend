const mongoose = require("mongoose");

// Define the product schema
const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  productStock: {
    type: Number,
  },
  productUniqueId: {
    type: String,
    required: true,
    unique: true,
  },
  productDescription: {
    type: String,
  },
  productRegularPrice: {
    type: Number,
    required: true,
  },
  productOffer: {
    type: Number,
    default: 0,
  },
  productTag: {
    type: [String],
    default: [],
  },
  images: {
    type: [String],
    default: [],
    required: true,
  },
  productLive: {
    type: Boolean,
    default: true,
  },
  productCode: {
    type: String,
  },
  productTP: {
    type: Number,
  },
  productMRP: {
    type: Number,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  shortDescription: {
    type: String, // Adding short description
    default: "",
  },
  productYoutubeLink: {
    type: String, // Adding YouTube link
    default: "",
  },
  additionalInfo: {
    type: String, // Adding additional information
    default: "",
  },
  pdfFileName: {
    type: String, // Adding PDF file name
    default: "",
  },
});

// Create the Product model using the product schema
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
