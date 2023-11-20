// product-price.entity.js
const { EntitySchema } = require('typeorm');
const { productString, productSizeString, productPriceString } = require("../constante/entityName.js")

module.exports = new EntitySchema({
    name: productPriceString,
    columns: {
        product_price_id: {
            type: 'int',
            primary: true,
            generated: true,
        },
        product_id: {
            type: 'int',
        },
        product_size_id: {
            type: 'int',
        },
        product_price: {
            type: 'double',
        },
    },
    relations: {
        product: {
            type: 'many-to-one',
            target: productString,
            inverseSide: 'productPrice',
            joinColumn: {
                name: 'product_id',
                referencedColumnName: 'product_id',
            },
        },
        productSize: {
            type: 'many-to-one',
            target: productSizeString,
            inverseSide: 'productPrice',
            joinColumn: {
                name: 'product_size_id',
                referencedColumnName: 'product_size_id',
            },
        },
    },
});
