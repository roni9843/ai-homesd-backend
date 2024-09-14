const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false, // Image is no longer required
  },
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
