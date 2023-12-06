const express = require("express")
const asyncHandler = require("../middlewares/async")
const AuthController = require("../controllers/auth.controller")
const { registerValidate, loginValidate, forgotPasswordValidate, comfirmChangePassword } = require("../validates").authValidate
const authentication = require("../middlewares/authentication")
const checkRole = require("../middlewares/checkRole")

const router = express.Router()

// Guest
router.post("/register", registerValidate, asyncHandler(AuthController.register))
router.post("/login", loginValidate, asyncHandler(AuthController.login))
router.get("/comfirm-change-password", comfirmChangePassword, asyncHandler(AuthController.resetPassword))
router.post("/forgot-password", forgotPasswordValidate, asyncHandler(AuthController.requestChangePassword))

// User login
router.post("/logout", authentication, checkRole(["Admin", "Customer", "Staff"]), asyncHandler(AuthController.logout))

module.exports = router