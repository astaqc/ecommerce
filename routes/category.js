const express = require("express");
const router = express.Router();
const {
  create,
  getCategory,
  updateCategory,
  deleteCategory,
  getCategories
} = require("../controllers/category");
const { requireLogin, isAdmin } = require("../middleware/auth");

router.post("/create", requireLogin, isAdmin, create);
router.get("/:categoryId", getCategory);
router.put("/:categoryId/:userId", requireLogin, isAdmin, updateCategory);
router.delete("/:categoryId/:userId", requireLogin, isAdmin, deleteCategory);
router.get("/", getCategories);

module.exports = router;
