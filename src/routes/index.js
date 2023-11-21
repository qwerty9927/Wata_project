const express = require("express");
const router = express.Router();

// Products route
router.use('/products', require("./product.route"));

// Auth route
router.use("/auth", require("./auth.route"));

// Orders route
router.use('/orders', require("./order.route"));

module.exports = router 