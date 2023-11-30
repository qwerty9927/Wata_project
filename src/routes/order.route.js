const express = require("express");
const router = express.Router();

const asyncHandler = require("../middlewares/async");
const orderControler = require("../controllers/order.controller");
const { orderValidate } = require("../validates/index");

const authentication = require("../middlewares/authentication");
const checkRole = require("../middlewares/checkRole");

// Get orders by userId
router.get('/', authentication, checkRole(["Admin", "Staff", "Customer"]), asyncHandler(orderControler.getOrderByUserId));

// Create new product
router.post('/', authentication, checkRole(["Admin", "Staff", "Customer"]), orderValidate.validatorForCreate(), asyncHandler(orderControler.postCreateOrder));

// Get all order with role admin and staff
router.get('/all', authentication, checkRole(["Admin", "Staff"]), asyncHandler(orderControler.getAllOrder));

// Change order status
router.put('/:id', authentication, checkRole(["Admin", "Staff"]), orderValidate.validatorForChangeStatus(), asyncHandler(orderControler.putChangeOrderStatus));

module.exports = router