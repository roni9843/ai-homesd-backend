const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  category: {
    type: String,
    required: true, // Optionally, you can make this field required
  },
  image: {
    type: String,
    required: true, // Optionally, you can make this field required
  },
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
