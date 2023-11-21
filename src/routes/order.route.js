const express = require("express");
const router = express.Router();

const authentication = require("../middlewares/authentication");
const checkRole = require("../middlewares/checkRole");
const asyncHandler = require("../middlewares/async");
const orderControler = require("../controllers/order.controller");
const { orderValidate } = require("../validates/index");
// authentication, checkRole(["Admin", "Staff","Customer"])

// Get orders by userId
router.get('/', asyncHandler(orderControler.getOrderByUserId));

// Create new product
router.post('/', orderValidate.validatorForCreate(), asyncHandler(orderControler.postCreateOrder));

// Change order status
router.put('/:id', checkRole(["Admin", "Staff"]), orderValidate.validatorForChangeStatus(), asyncHandler(orderControler.putChangeOrderStatus));

module.exports = router