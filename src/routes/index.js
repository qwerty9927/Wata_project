const express = require("express")
const router = express.Router()

// Products route
router.use("/products", require("./product.route"))

// Auth route
router.use("/auth", require("./auth.route"))

// Orders route
router.use("/orders", require("./order.route"))

// Users route
router.use("/users", require("./user.route"))

// Stores route
router.use("/stores", require("./store.route"))

module.exports = router
