const express = require("express");
const router = express.Router();
const { create } = require("../controllers/product");
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

module.exports = router;
