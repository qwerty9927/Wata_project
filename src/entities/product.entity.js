const { EntitySchema } = require("typeorm")
const { productString, productPriceString, orderDetailString } = require("../constants/entityName.js")

const productEntity = new EntitySchema({
  name: productString,
  columns: {
    product_id: {
      type: "int",
      primary: true,
      generated: true
    },
    product_name: {
      type: "varchar"
    },
    product_slug: {
      type: "varchar"
    },
    product_image: {
      type: "varchar"
    },
    product_desc: {
      type: "varchar"
    },
    category: {
      type: "enum",
      enum: ['food', 'drink']
    },
    is_deleted: {
      type: "tinyint"
    },
  },
  relations: {
    productPrice: {
      type: 'one-to-many',
      target: productPriceString,
      inverseSide: 'product',
    },
    product_orderDetail_relation: {
      type: 'one-to-many',
      target: orderDetailString,
      inverseSide: 'orderDetail_product_relation',
    },
  }
})

module.exports = productEntity