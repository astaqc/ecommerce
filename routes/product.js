const express = require("express");
const router = express.Router();
const { create, getProduct, deleteProduct } = require("../controllers/product");
const { requireLogin, isAdmin } = require("../middleware/auth");
const { validateProduct, validationErrors } = require("../validators/product");

router.post(
  "/create",
  requireLogin,
  isAdmin,
  validateProduct,
  validationErrors,
  create
);
router.get("/:productId", getProduct);
router.delete("/:productId/:userId", requireLogin, isAdmin, deleteProduct);

module.exports = router;
