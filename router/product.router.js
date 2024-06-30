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
} = require("../controller/Product.Controller");

const router = require("express").Router();

router.post("/findAndCheckDue", CheckProduct);

router.get("/getAllCategoryWithProducts", getAllCategoryWithProducts);

router.post("/getProduct", getProductController);

router.post("/getProductById", getProductByIdController);

router.post("/postProduct", postProductController);

// ? ======= Product ==============

router.get("/getAllCategory", getAllCategoryController);

router.post("/addCategory", addCategoryController);

router.delete("/removeCategory/:id", removeCategoryController);

// ? =============== auth ===========

router.post("/login", loginController);

router.post("/signup", signupController);

// ? =============== user =============

router.post("/getTheUser", getTheUserController);

// ? ================== order ============
router.post("/postOrder", postOrderController);

// Get order by ID
router.get("/:id", getOrderByIdController);

// Update order status
router.put("/:id/status", updateOrderStatusController);

module.exports = router;
