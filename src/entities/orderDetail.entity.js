const { EntitySchema } = require("typeorm")
const { orderDetailString, productString, orderString } = require("../constants/entityName.js")

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
    },
    product_size: {
      type: "varchar"
    }
  },
  relations: {
    orderDetail_order_relation: {
      target: orderString,
      type: "many-to-one",
      joinColumn: {
        name: "order_id",
        referencedColumnName: 'order_id',
      },
      inverseSide: "order_orderDetail_relation"
    },
    orderDetail_product_relation: {
      target: productString,
      type: "many-to-one",
      joinColumn: {
        name: "product_id",
        referencedColumnName: 'product_id',
      },
      inverseSide: "product_orderDetail_relation"
    },
  }
})

module.exports = orderDetailEntity