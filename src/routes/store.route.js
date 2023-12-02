const express = require("express")
const asyncHandler = require("../middlewares/async")
const StoreController = require("../controllers/store.controller")
const authentication = require("../middlewares/authentication")
const checkRole = require("../middlewares/checkRole")
const {
  createStoreValidate,
  modifyStoreInfomationValidate,
} = require("../validates/store.validate")
const router = express.Router()

// Guest
router.get("/", asyncHandler(StoreController.getAllStore))
router.get("/:id", asyncHandler(StoreController.getStoreInfo))

// User Login

// Staff
router.get(
  "/:id/orders",
  authentication,
  checkRole(["Staff", "Admin"]),
  asyncHandler(StoreController.getAllOrderOfStore)
)

// Admin
router.post(
  "/",
  authentication,
  checkRole(["Admin"]),
  createStoreValidate,
  asyncHandler(StoreController.createStore)
)
router.patch(
  "/:id",
  authentication,
  checkRole(["Admin"]),
  modifyStoreInfomationValidate,
  asyncHandler(StoreController.modifyStoreInfomation)
)

module.exports = router
