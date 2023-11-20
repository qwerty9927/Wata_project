const { EntitySchema } = require("typeorm")
const { orderDetailString } = require("../constante/entityName.js")

const orderDetailEntity = new EntitySchema({
  name: orderDetailString,
  columns: {
    order_detail_id: {
      type: "int",
      primary: true,
      generated: true
    },
    quantity_buy: {
      type: "tinyint"
    },
    order_id: {
      type: "int"
    },
    product_id: {
      type: "int"
    }
  }
})

module.exports = orderDetailEntity