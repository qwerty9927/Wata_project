const express = require("express");
const router = express.Router();

const asyncHandler = require("../middlewares/async");
const productControler = require("../controllers/product.controller");
const { productValidate, productPriceValidate } = require("../validates/index");
const cloudinaryHelper = require("../helpers/cloudinary");

const authentication = require("../middlewares/authentication");
const checkRole = require("../middlewares/checkRole");

// Get all product
router.get('/', asyncHandler(productControler.getAllProduct));

// Get product by id
router.get('/:id', asyncHandler(productControler.getProductById));

// Create new product
router.post('/', authentication, checkRole(["Admin", "Staff"]), cloudinaryHelper.uploadFileToCloud('productImage', 'products'), productValidate.validator(), asyncHandler(productControler.postCreateProduct));

// Update value for product
router.put('/:id', authentication, checkRole(["Admin", "Staff"]), cloudinaryHelper.uploadFileToCloud('productImage', 'products'), productValidate.validator(), asyncHandler(productControler.putUpdateProduct));

// Add price for product
router.post('/:productId/prices', authentication, checkRole(["Admin", "Staff"]), productPriceValidate.validator(), asyncHandler(productControler.postAddProductPrice));

// Delete one product
router.delete('/:id', authentication, checkRole(["Admin", "Staff"]), asyncHandler(productControler.deleteOneProduct));

module.exports = router