const express = require("express");
const router = express.Router();

// Products route
router.use('/products', require("../routes/product.route"));

module.exports = router 