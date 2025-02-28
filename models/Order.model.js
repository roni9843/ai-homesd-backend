const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

// Define the order schema
const orderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      default: uuidv4, // Generate a unique order ID using UUID
      unique: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        price: {
          type: Number,
          required: true,
          set: (value) => parseFloat(value).toFixed(2), // Ensure 2 decimal places
        },
        qty: {
          type: Number,
          required: true,
          min: 1, // Minimum quantity is 1
        },
      },
    ],
    address: {
      type: String,
    },
    orderDate: {
      type: Date,
      default: Date.now, // Set default value to current date
    },
    status: {
      type: String,
      enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
      default: "Pending",
    },
    totalAmount: {
      type: Number,
      required: true,
      set: (value) => parseFloat(value).toFixed(2), // Ensure 2 decimal places for total amount
    },
    paymentMethod: {
      type: String,
      enum: ["Credit Card", "PayPal", "Cash on Delivery"],
      required: true,
    },

    shippingCost:  {
      type: Number,
      required: true,
      set: (value) => parseFloat(value).toFixed(2), // Ensure 2 decimal places for total amount
    },
    shippingState: {
      type: String,
      required: true,
    },
    couponCode:   {
      type: String,
      default: null, // Set default value to current date
    },
    couponAmount:  {
      type: Number,
      set: (value) => parseFloat(value).toFixed(2), // Ensure 2 decimal places for total amount
      default: 0, // Set default value to current date
    },

    phoneNumber :  {
      type: String,
    },
    thanaDistrict:  {
      type: String,
      default: null, // Set default value to current date
    },
    name :  {
      type: String,
      default: null, // Set default value to current date
    },
    orderNotes :   {
      type: String,
      default: null, // Set default value to current date
    },





  },
  { timestamps: true }
);

// Create the Order model using the order schema
const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
