const express = require("express");
const cors = require("cors");
const globalError = require("./error/error");
const connectDb = require("./db/db");
const config = require("./config/config");
const router = require("./router/product.router");
const path = require("path");
const { uploadImage } = require("./controller/ImageUpload.Controller");

// Create app
const app = express();

// // Use middleware
// app.use(cors({
//   origin: "http://localhost:5000", // Allow requests from frontend
//   methods: ["GET", "POST"], // Specify allowed methods
//   allowedHeaders: ["Content-Type"], // Allow necessary headers
// }));

app.use(cors());

app.use(express.urlencoded({ extended: true })); // For form data parsing (optional, not needed for multipart)
app.use(express.json()); // For JSON data (not needed for file uploads)

// Serve uploaded files statically
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// * Image upload route (uses multer from uploadImage controller)
app.post("/upload", uploadImage); // Matches frontend fetch URL

// Other routes
app.use(router);

// Custom middleware (if any can go here)

// Global error handler
app.use(globalError);

// Private route
app.get("/private", (req, res) => {
  return res.status(200).json({
    message: "I am a private route",
  });
});

// Root route
app.get("/", (req, res) => {
  res.send({
    message: "This is the root route for ai-homesd-backend",
  });
});

// MongoDB connection and server start
connectDb(config.DB_CONN)
  .then(() => {
    console.log("Database connected");
    app.listen(config.PORT, () => {
      console.log(`Server is running at ${config.PORT}`);
    });
  })
  .catch((e) => console.log("Database connection failed:", e));

module.exports = app; // Optional: export app for testing or other modules