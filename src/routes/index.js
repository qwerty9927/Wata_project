const express = require("express")
const router = express.Router()

const asyncHandler = require("../middleware/async");
const ExampleController = require("../controllers/example.controller")

router.get('/', asyncHandler(ExampleController.getExample))
router.get('/example2', asyncHandler(ExampleController.getExample2))

module.exports = router 