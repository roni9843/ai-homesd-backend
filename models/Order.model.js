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
    },
    paymentMethod: {
      type: String,
      enum: ["Credit Card", "PayPal", "Cash on Delivery"],
      required: true,
    },
  },
  { timestamps: true }
);

// Create the Order model using the order schema
const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
