const { ErrorResponse } = require("../common/error.response");
const { productString, productPriceString, productSizeString } = require("../constants/entityName");
const { convertProducts, convertProduct } = require("../dto/products.dto");
const cloudinaryHelper = require("../helpers/cloudinary");
const AppDataSource = require("../db/data-source");
const slugify = require("slugify");
const { productConstant } = require("../constants");

class ProductService {
  constructor() {
    this.productRepo = AppDataSource.getRepository(productString);
    this.productPriceRepo = AppDataSource.getRepository(productPriceString);
    this.productSizeRepo = AppDataSource.getRepository(productSizeString);
  }

  async findAllProduct(page = 1, limit = 10, category = null, relations = []) {
    const maxLimit = productConstant.PAGINATION.MAX_LIMIT;

    // Pagination
    page = Math.max(1, parseInt(page)) || 1;
    limit = Math.min(maxLimit, Math.max(0, parseInt(limit)) || maxLimit);
    const skip = (page - 1) * limit;

    const products = await this.productRepo.find({ relations, where: { is_deleted: false, category }, skip, take: limit });
    return convertProducts(products);
  }

  async findOneProduct(productId, relations = []) {
    const product = await this.productRepo.findOne({ relations, where: { is_deleted: false, product_id: productId } });
    if (!product) {
      throw new ErrorResponse("Product not found", 404);
    }
    return convertProduct(product);
  }

  async createProduct({ productName, productImage, productDesc, category }) {
    const newProduct = this.productRepo.create({
      product_name: productName,
      product_slug: slugify(productName, { lower: true }),
      product_image: productImage || null,
      product_desc: productDesc,
      category: category,
      is_deleted: false
    });

    return await this.productRepo.save(newProduct);
  }

  async updateProduct(productId, { productName, productImage, productDesc, category }) {
    const product = await this.productRepo.findOne({ where: { is_deleted: false, product_id: productId } });

    if (!product) {
      throw new ErrorResponse("Product not found", 404);
    }

    const oldProductImage = product.product_image;
    if (productImage && oldProductImage) await cloudinaryHelper.removeFileOnCloud(oldProductImage);

    product.product_name = productName;
    product.product_slug = slugify(productName, { lower: true });
    product.product_image = productImage || oldProductImage;
    product.product_desc = productDesc;
    product.category = category;

    await this.productRepo.save(product);
  }

  async addProductPrice(productId, { size, price }) {
    const product = await this.productRepo.findOne({
      where: { is_deleted: false, product_id: productId },
    });

    if (!product) {
      throw new ErrorResponse("Product not found", 404);
    }

    const productSize = await this.productSizeRepo.findOne({
      where: { size_name: size },
    });

    if (!productSize) {
      throw new ErrorResponse("Product size not found", 404);
    }

    let productPrice = await this.productPriceRepo.findOne({
      where: { product_id: productId, product_size_id: productSize.product_size_id },
    });

    if (productPrice) {
      throw new ErrorResponse("Product price already exists", 409);
    }

    const newProductPrice = this.productPriceRepo.create({
      product_id: parseInt(productId),
      product_size_id: productSize.product_size_id,
      product_price: parseFloat(price),
    });

    return await this.productPriceRepo.save(newProductPrice);
  }

  async softDeleteOneProduct(productId) {
    const product = await this.productRepo.findOne({ where: { is_deleted: false, product_id: productId } });

    if (!product) {
      throw new ErrorResponse("Product not found", 404);
    }

    product.is_deleted = true;
    await this.productRepo.save(product);
  }
}

module.exports = new ProductService();
