const express = require("express")
const authentication = require("../middlewares/authentication")
const UserController = require("../controllers/user.controller")
const checkRole = require("../middlewares/checkRole")
const asyncHandler = require("../middlewares/async")
const { changeRoleValidate, changePasswordValidate, modifyProfileValidate } = require("../validates").userValidate

const router = express.Router()

// User login
router.get("/me", authentication, checkRole(["Customer", "Staff", "Admin"]), asyncHandler(UserController.getUserInfo))
router.patch("/change-password", authentication, checkRole(["Customer", "Staff", "Admin"]), changePasswordValidate, asyncHandler(UserController.changePassword))
router.patch("/me", authentication, checkRole(["Customer", "Staff", "Admin"]), modifyProfileValidate, asyncHandler(UserController.modifyProfile))

// Staff, Admin
router.get("/", authentication, checkRole(["Staff", "Admin"]), asyncHandler(UserController.getAllUser))

// Admin
router.patch("/change-role", authentication, checkRole(["Admin"]), changeRoleValidate, asyncHandler(UserController.changeRole))

// Get my order
router.get("/order", authentication, checkRole(["Customer", "Staff", "Admin"]), asyncHandler(UserController.getMyOrderByUserId))

module.exports = router