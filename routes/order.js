const express = require("express");
const router = express.Router();
const { requireLogin } = require("../middleware/auth");
const { createOrder } = require("../controllers/order");
const { addOrderToHistory } = require("../controllers/user");

router.post("/", requireLogin, addOrderToHistory, createOrder);

module.exports = router;
