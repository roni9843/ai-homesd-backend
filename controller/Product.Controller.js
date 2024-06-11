const Category = require("../models/Category.model");
const Product = require("../models/Product.model");

const { v4: uuidv4 } = require("uuid");

const CheckProduct = async (req, res, next) => {
  const { Check } = req.body; // Assuming userId is provided in the request body

  return res.status(200).json({
    message: "successfully",
  });
};

/**
 * Get all categories
 */
const getAllCategoryController = async (req, res, next) => {
  console.log("call");

  try {
    const categories = await Category.find(); // Fetch all categories

    if (!categories) {
      return res.status(404).json({ message: "No categories found" });
    }

    res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 *
 * ? add category
 */
const addCategoryController = async (req, res, next) => {
  const { categories } = req.body;

  console.log(categories);
  // Check if categories is an array
  if (!Array.isArray(categories)) {
    return res.status(400).json({ message: "Categories must be an array" });
  }

  try {
    // Iterate over the categories array using a for loop

    for (let i = 0; i < categories.length; i++) {
      // Create a new Category instance
      const category = new Category({ category: categories[i] });

      // Save the category to the database
      await category.save();
    }

    const getCategories = await Category.find(); // Fetch all categories
    // Send a success response
    res
      .status(201)
      .json({ message: "Categories added successfully", getCategories });
  } catch (error) {
    // If an error occurs, pass it to the error handler
    next(error);
  }
};

const removeCategoryController = async (req, res, next) => {
  const categoryId = req.params.id;

  try {
    // Check if there are any products associated with the category
    const products = await Product.find({ category: categoryId });

    if (products.length > 0) {
      return res.status(400).json({
        message: "Category cannot be deleted as it has associated products",
      });
    }

    // Delete the category
    await Category.findByIdAndDelete(categoryId);

    return res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    next(error);
  }
};

/**
 * ? post product
 */

const postProductController = async (req, res, next) => {
  console.log(req.body);

  try {
    // Extract product data and category from the request body
    const {
      productName,
      productStock,
      productDescription,
      productRegularPrice,
      productOffer,
      productTag,
      images,
      productLive,
      productCode,
      productTP,
      productMRP,
      category, // Assuming category is provided in the request body
    } = req.body;

    // Generate a unique product ID
    const productUniqueId = uuidv4();

    // Create a new product instance with the category reference
    const newProduct = new Product({
      productName,
      productStock,
      productUniqueId,
      productDescription,
      productRegularPrice,
      productOffer,
      productTag,
      images,
      productLive,
      productCode,
      productTP,
      productMRP,
      category: category, // Reference to the category document
    });

    // Save the product to the database
    await newProduct.save();

    // Send a success response
    res
      .status(201)
      .json({ message: "Product created successfully", product: newProduct });
  } catch (error) {
    // Handle any errors
    next(error);
  }
};

const getProductController = async (req, res, next) => {
  console.log("get product ");

  try {
    const { category } = req.body;

    if (!category) {
      return res.status(400).json({
        success: false,
        message: "Category is required in the request body",
      });
    }

    let products;
    if (category === "All") {
      // Fetch all products where productLive is true
      products = await Product.find({ productLive: true });
    } else {
      // Fetch products of the specified category where productLive is true
      products = await Product.find({ category: category, productLive: true });
    }

    return res.status(200).json({ success: true, data: products });
  } catch (error) {
    // Handle any errors that occur during the database query
    return res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

const getProductByIdController = async (req, res, next) => {
  const { productId } = req.body; // Extract product ID from request body

  console.log(productId);

  if (!productId) {
    return res.status(400).json({ message: "Product ID is required" });
  }

  try {
    const product = await Product.findById(productId).populate("category");

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    next(error); // Pass errors to the error handler
  }
};

module.exports = {
  CheckProduct,
  addCategoryController,
  getAllCategoryController,
  postProductController,
  removeCategoryController,
  getProductController,
  getProductByIdController,
};
