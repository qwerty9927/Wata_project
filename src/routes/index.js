const express = require("express")
const router = express.Router()

const exampleRouter = require("../routes/example.route")

// Example route
router.use(exampleRouter)

module.exports = router 