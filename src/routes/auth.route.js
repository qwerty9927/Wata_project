const express = require("express")
const asyncHandler = require("../middleware/async")
const AuthController = require("../controllers/auth.controller")
const { registerValidate, loginValidate, forgotPasswordValidate } = require("../validates/auth.validate")
const authorization = require("../middleware/authorization")
const checkRole = require("../middleware/checkRole")

const router = express.Router()

// Guest
router.post("/register", registerValidate, asyncHandler(AuthController.register))
router.post("/login", loginValidate, asyncHandler(AuthController.login))
router.post("/forgot-password", forgotPasswordValidate, asyncHandler(AuthController.resetPassword))

// Authorization
router.use(authorization)

// User login
router.use(checkRole(["Admin", "Customer", "Staff"]))
router.post("/logout", asyncHandler(AuthController.logout))

module.exports = router