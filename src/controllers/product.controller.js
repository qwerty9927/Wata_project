const { BadRequest, UnprocessableContentResponse } = require("../common/error.response");
const { SuccessResponse } = require("../common/success.response");
const productService = require("../services/product.service");
const cloudinaryHelper = require("../helpers/cloudinary");

const { validationResult } = require("express-validator");

const relationProductPrice = 'productPrice';
const relationProductSize = 'productPrice.productSize';

class ProductController {
  async getAllProduct(req, res, next) {
    const { category, page, limit } = req.query;
    const relations = [relationProductPrice, relationProductSize];
    const products = await productService.findAllProduct(page, limit, category, relations)

    new SuccessResponse({
      metadata: products,
    }).send({ res });
  }

  async getProductById(req, res, next) {
    const relations = [relationProductPrice, relationProductSize];
    const product = await productService.findOneProduct(req.params.id, relations);

    new SuccessResponse({
      metadata: product,
    }).send({ res });
  }

  async postCreateProduct(req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      if (req.file?.filename) cloudinaryHelper.removeFileOnCloud(req.file.filename);
      // Convert validation errors to an array of error messages
      const errorMessages = errors.array().map((error) => error.msg);
      throw new UnprocessableContentResponse(errorMessages);
    }

    const payload = req.body;
    payload.productImage = req.file?.filename || undefined;
    const result = await productService.createProduct(payload);

    new SuccessResponse({
      metadata: result,
      code: 201
    }).send({ res });
  }

  async putUpdateProduct(req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      if (req.file?.filename) cloudinaryHelper.removeFileOnCloud(req.file.filename);
      // Convert validation errors to an array of error messages
      const errorMessages = errors.array().map((error) => error.msg);
      throw new UnprocessableContentResponse(errorMessages);
    }

    const payload = req.body;
    payload.productImage = req.file?.filename || undefined;
    const productId = req.params.id;

    await productService.updateProduct(productId, payload);

    new SuccessResponse({
      message: "Update product success"
    }).send({ res });
  }

  async postAddProductPrice(req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // Convert validation errors to an array of error messages
      const errorMessages = errors.array().map((error) => error.msg);
      throw new UnprocessableContentResponse(errorMessages);
    }

    const productId = req.params.productId;
    const payload = req.body;

    const result = await productService.addProductPrice(productId, payload);

    new SuccessResponse({
      metadata: result
    }).send({ res });
  }

  async deleteOneProduct(req, res, next) {
    await productService.softDeleteOneProduct(req.params.id);

    new SuccessResponse({
      message: "Delete product success"
    }).send({ res });
  }
}

module.exports = new ProductController();