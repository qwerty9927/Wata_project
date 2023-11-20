const express = require("express");
const router = express.Router();

// Products route
router.use('/products', require("../routes/product.route"));

// Auth route
router.use("/auth", require("./auth.route"));

module.exports = router 