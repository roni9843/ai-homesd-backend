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
  getAllUserController,
  updateProductController,
  deleteProductController,
  postEmailController,
  getAllEmailController,
  postCouponController,
  UpdateCouponController,
  validateCouponController,
  getAllCouponController,
  updateShippingController,
  createShippingController,
  getShippingByIdController,
  uploadImageController,
  deleteCouponController
} = require("../controller/Product.Controller");
const { uploadImage } = require("../controller/ImageUpload.Controller");

const router = require("express").Router();

router.post("/findAndCheckDue", CheckProduct);

router.get("/getAllProductId", getAllProductIdController);

router.get("/getAllCategoryWithProducts", getAllCategoryWithProducts);

router.post("/getProduct", getProductController);

router.post("/getProductById", getProductByIdController);


router.post("/postProduct", postProductController);

router.post("/updateProduct/:id", updateProductController);

router.post("/deleteProduct/:id", deleteProductController);




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

router.get("/getAllUser", getAllUserController);

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

// ? ==================== Email ==========

router.post("/postEmail", postEmailController);
router.get("/getAllEmail", getAllEmailController);



// ? ==================== Coupon ==========

router.post("/coupons", postCouponController);
router.patch("/coupons/:id", UpdateCouponController);
router.delete("/coupons/:id", deleteCouponController);
router.get("/coupons/validate/:couponCode", validateCouponController);
router.get("/coupons", getAllCouponController);


// ? ===================== shipping ====================

router.put('/shipping/:id', updateShippingController)

// Route to create a new shipping entry
router.post('/shipping', createShippingController);

// Route to get a shipping entry by ID
router.get('/shipping/:id', getShippingByIdController);



module.exports = router;
