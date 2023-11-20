const express = require("express")
const authRouter = require("./auth.route")
const router = express.Router()

// Products route
router.use('/products', require("../routes/product.route"));

// Auth route
router.use("/auth", authRouter)

module.exports = router 