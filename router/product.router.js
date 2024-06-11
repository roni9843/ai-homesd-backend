const {
  CheckProduct,
  addCategoryController,
  getAllCategoryController,
  postProductController,
  removeCategoryController,
  getProductController,
  getProductByIdController,
} = require("../controller/Product.Controller");

const router = require("express").Router();

router.post("/findAndCheckDue", CheckProduct);

router.post("/getProduct", getProductController);

router.post("/getProductById", getProductByIdController);

router.post("/postProduct", postProductController);

// ? ======= Product ==============

router.get("/getAllCategory", getAllCategoryController);

router.post("/addCategory", addCategoryController);

router.delete("/removeCategory/:id", removeCategoryController);

module.exports = router;
