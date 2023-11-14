const express = require("express")
const authRouter = require("./auth.route")
const router = express.Router()

const exampleRouter = require("../routes/example.route")

// Example route
router.use(exampleRouter)

// Auth route
router.use("/auth", authRouter)

module.exports = router 