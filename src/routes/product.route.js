const express = require("express");
const router = express.Router();

const asyncHandler = require("../middlewares/async");
const productControler = require("../controllers/product.controller");
const { productValidate, productPriceValidate } = require("../validates/index");
const cloudinaryHelper = require("../helpers/cloudinary");

// Get all product
router.get('/', asyncHandler(productControler.getAllProduct));

// Get product by id
router.get('/:id', asyncHandler(productControler.getProductById));

// Create new product
router.post('/', cloudinaryHelper.uploadFileToCloud('productImage', 'products'), productValidate.validator(), asyncHandler(productControler.postProduct));

// Update value for product
router.put('/:id', cloudinaryHelper.uploadFileToCloud('productImage', 'products'), productValidate.validator(), asyncHandler(productControler.putUpdateProduct));

// Add price for product
router.post('/:productId/prices', productPriceValidate.validator(), asyncHandler(productControler.postProductPrice));

// Delete one product
router.delete('/:id', asyncHandler(productControler.deleteOneProduct));

module.exports = router