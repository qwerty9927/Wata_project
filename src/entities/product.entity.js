const { EntitySchema } = require("typeorm")
const { productString } = require("../constance/entityName.js")

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
    product_price_base: {
      type: "double"
    },
    product_desc: {
      type: "varchar"
    },
    category: {
      type: "enum",
      enum: ['food', 'drink']
    },
    product_size_id: {
      type: "int"
    },
    is_deleted: {
      type: "tinyint"
    },
  }
})

module.exports = productEntity