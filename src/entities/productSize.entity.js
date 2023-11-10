const { EntitySchema } = require("typeorm")
const { productSizeString } = require("../constance/entityName.js")

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
    },
    price_percent_up: {
      type: "double"
    }
  }
})

module.exports = productSizeEntity