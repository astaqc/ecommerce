const express = require("express");
const router = express.Router();
const { requireLogin } = require("../middleware/auth");
const { createOrder } = require("../controllers/order");
const { addOrderToHistory } = require("../controllers/user");
const { updateStock } = require("../controllers/product");

router.post("/", requireLogin, addOrderToHistory, updateStock, createOrder);

module.exports = router;
