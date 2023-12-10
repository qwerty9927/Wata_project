const { EntitySchema } = require("typeorm")
const { productSizeString, productPriceString } = require("../constants/entityName.js")

const productSizeEntity = new EntitySchema({
  name: productSizeString,
  columns: {
    product_size_id: {
      type: "int",
      primary: true,
      generated: true
    },
    size_name: {
      type: "varchar"
    }
  },
  relations: {
    productPrice: {
      type: 'one-to-many',
      target: productPriceString,
      inverseSide: 'productSize',
    },
    productSize_orderDetail_relation: {
      type: 'one-to-many',
      target: productSizeString,
      inverseSide: 'productSize',
    },
  }
})

module.exports = productSizeEntity