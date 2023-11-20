const { EntitySchema } = require("typeorm")
const { orderString } = require("../constants/entityName.js")

const orderEntity = new EntitySchema({
  name: orderString,
  columns: {
    order_id: {
      type: "int",
      primary: true,
      generated: true,
    },
    order_code: {
      type: "varchar",
    },
    order_status: {
      type: "enum",
      enum: [
        "pending",
        "processing",
        "done",
        "cancelled",
        "shipping",
        "payment",
      ],
    },
    fee_transport: {
      type: "double",
    },
    total_price_product: {
      type: "double",
    },
    order_price: {
      type: "double",
    },
    order_date: {
      type: "timestamp"
    },
    user_id: {
      type: "int",
    },
    store_id: {
      type: "int",
    },
    delivery_id: {
      type: "int",
    }
  },
})

module.exports = orderEntity
