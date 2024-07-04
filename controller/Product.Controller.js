const Category = require("../models/Category.model");
const Product = require("../models/Product.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { v4: uuidv4 } = require("uuid");
const User = require("../models/User.model");
const Order = require("../models/Order.model");

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
  const { category, image } = req.body;

  // Check if category and image are provided
  if (!category || !image) {
    return res.status(400).json({ message: "Category and image are required" });
  }

  try {
    // Create a new Category instance
    const newCategory = new Category({ category, image });

    // Save the category to the database
    await newCategory.save();

    const getCategories = await Category.find(); // Fetch all categories

    // Send a success response
    res
      .status(201)
      .json({ message: "Category added successfully", getCategories });
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

/**
 * ? get all product with there category
 */

const getAllCategoryWithProducts = async (req, res, next) => {
  try {
    // Fetch all categories
    const categories = await Category.find();

    // Fetch all products and group them by category
    const products = await Product.find().populate("category");

    // Group products by category
    const categoryWithProducts = categories.map((category) => {
      return {
        category,
        products: products.filter(
          (product) =>
            product.category._id.toString() === category._id.toString()
        ),
      };
    });

    res.status(200).json({
      success: true,
      data: categoryWithProducts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
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

// ? =========== auth ============

const signupController = async (req, res) => {
  const { username, phoneNumber, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      phoneNumber,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, "hello", {
      expiresIn: "1h",
    });

    res.status(201).json({ message: "User created successfully", token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const loginController = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, "hello", {
      expiresIn: "1h",
    });

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ? ================= user ===================

const getTheUserController = async (req, res, next) => {
  const userId = req.body.id; // Assuming user ID is passed in the body

  try {
    // Find user by ID and populate the orders
    const user = await User.findById(userId).lean();

    if (!user) {
      return res.status(200).json({ user: null, orderHistory: [] });
    }

    // Find orders related to the user
    const orders = await Order.find({ userId: userId }).lean();

    res.status(200).json({ user, orderHistory: orders });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// ? =================== order ==================

const postOrderController = async (req, res, next) => {
  const { userId, products, address, totalAmount, paymentMethod } = req.body;

  console.log("log ->", userId, products, address, totalAmount, paymentMethod);

  if (!userId || !products || !address || !totalAmount || !paymentMethod) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const newOrder = new Order({
    userId,
    products,
    address,
    totalAmount,
    paymentMethod,
  });

  try {
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get Order by ID

const getOrderByIdController = async (req, res) => {
  const { userId } = req.body;

  try {
    const orders = await Order.find({ userId })
      .populate("products.product")
      .sort({ createdAt: -1 });

    if (!orders.length) {
      return res.status(404).json({ message: "No orders found for this user" });
    }
    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update Order Status
const updateOrderStatusController = async (req, res) => {
  const { status } = req.body;
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    order.status = status;
    await order.save();
    res.json(order);
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({ message: "Server error" });
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
  loginController,
  signupController,
  getTheUserController,
  postOrderController,
  updateOrderStatusController,
  getOrderByIdController,
  getAllCategoryWithProducts,
};
