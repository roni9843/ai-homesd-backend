const {
  CheckProduct,
  addCategoryController,
  getAllCategoryController,
  postProductController,
  removeCategoryController,
  getProductController,
  getProductByIdController,
  signupController,
  loginController,
  getTheUserController,
  postOrderController,
  getOrderByIdController,
  updateOrderStatusController,
  getAllCategoryWithProducts,
  editProfileController,
  getAllOrderController,
  getOrderByOrderIdController,
  getAllProductIdController,
  getAllCategoryNameController,
} = require("../controller/Product.Controller");

const router = require("express").Router();

router.post("/findAndCheckDue", CheckProduct);

router.get("/getAllProductId", getAllProductIdController);

router.get("/getAllCategoryWithProducts", getAllCategoryWithProducts);

router.post("/getProduct", getProductController);

router.post("/getProductById", getProductByIdController);

router.post("/postProduct", postProductController);

// ? ======= Product ==============

router.get("/getAllCategory", getAllCategoryController);

router.get("/getAllCategoryName", getAllCategoryNameController);

router.post("/addCategory", addCategoryController);

router.delete("/removeCategory/:id", removeCategoryController);

// ? =============== auth ===========

router.post("/login", loginController);

router.post("/signup", signupController);

// ? =============== user =============

router.post("/getTheUser", getTheUserController);

router.post("/updateUser", editProfileController);

// ? ================== order ============
router.post("/postOrder", postOrderController);

// Get order by ID
router.post("/getTheOrder", getOrderByIdController);

router.post("/getOrderByOrderId", getOrderByOrderIdController);

// get all oder
router.get("/getAllOrder", getAllOrderController);

// Update order status
router.post("/updateOrderStatus/:id", updateOrderStatusController);

module.exports = router;
