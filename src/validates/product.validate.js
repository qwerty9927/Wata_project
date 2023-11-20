const { check } = require("express-validator");
const { productConstance } = require("../constance");
const util = require("util");

const options = {
    name: { min: 3, max: 80 },
    desc: { min: 10, max: 500 },
    category: ['food', 'drink', 'topping']
}

module.exports = {
    validator: () => {
        const msgErr = {
            productName: util.format(productConstance.PRODUCT_NOTIFY_VALIDATE.PRODUCT_NAME, options.name.min, options.name.max),
            productDesc: util.format(productConstance.PRODUCT_NOTIFY_VALIDATE.PRODUCT_DESC, options.desc.min, options.desc.max),
            productCategory: util.format(productConstance.PRODUCT_NOTIFY_VALIDATE.PRODUCT_CATEGORY, options.category.join('/'))
        }

        return [
            check('productName').escape().matches(/^[\p{L}0-9 ]+$/u).isLength({ min: options.name.min, max: options.name.max }).withMessage(msgErr.productName),
            check('productDesc').isLength({ min: options.desc.min, max: options.desc.max }).withMessage(msgErr.productDesc),
            check('category').isIn(options.category).withMessage(msgErr.productCategory)
        ]
    }
}