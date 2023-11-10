const express = require("express")
const router = express.Router()

const asyncHandler = require("../middleware/async");
const ExampleController = require("../controllers/example.controller")

// Test
router.get('/', asyncHandler(ExampleController.getExample))
router.get('/example2', asyncHandler(ExampleController.getExample2))
router.get("/test", asyncHandler(ExampleController.test))

// Guest

// Customer

// Staff

// Admin

module.exports = router