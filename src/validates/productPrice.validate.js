const { check } = require("express-validator");
const { productConstance } = require("../constance");
const util = require("util");

const options = {
    size: ['Small', 'Medium', 'Large']
}

module.exports = {
    validator: () => {
        const msgErr = {
            productSize: util.format(productConstance.PRODUCT_PRICE_NOTIFY_VALIDATE.PRODUCT_SIZE, options.size.join('/')),
            productPrice: util.format(productConstance.PRODUCT_PRICE_NOTIFY_VALIDATE.PRODUCT_PRICE)
        }

        return [
            check('size').isIn(options.size).withMessage(msgErr.productSize),
            check('price').isFloat().notEmpty().withMessage(msgErr.productPrice)
        ]
    }
}