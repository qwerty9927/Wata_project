const productValidate = require("./product.validate");
const productPriceValidate = require("./productPrice.validate");
const authValidate = require("./auth.validate");
const userValidate = require("./user.validate")
const orderValidate = require("./order.validate");
const reportValidate = require("./report.validate");

module.exports = {
    productValidate,
    productPriceValidate,
    authValidate,
    orderValidate,
    userValidate,
    reportValidate
}