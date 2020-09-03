const express = require("express");
const router = express.Router();
const {
  create,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  getRelatedProducts,
} = require("../controllers/product");
const { requireLogin, isAdmin } = require("../middleware/auth");

router.post("/create", requireLogin, isAdmin, create);
router.get("/:productId", getProduct);
router.put("/:productId/:userId", requireLogin, isAdmin, updateProduct);
router.delete("/:productId/:userId", requireLogin, isAdmin, deleteProduct);
router.get("/related/:productId", getRelatedProducts);
router.get("/", getProducts);

module.exports = router;
