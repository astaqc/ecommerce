const express = require("express");
const router = express.Router();
const { create } = require("../controllers/category");
const { requireLogin, isAdmin } = require("../middleware/auth");

router.post("/create", requireLogin, isAdmin, create);

module.exports = router;
