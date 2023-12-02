const { EntitySchema } = require("typeorm")
const {
  orderString,
  userString,
  orderDetailString,
  storeString,
} = require("../constants/entityName.js")

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
    order_address: {
      type: "varchar",
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
      type: "timestamp",
    },
    user_id: {
      type: "int",
    },
    store_id: {
      type: "int",
    },
    recipient_name: {
      type: "varchar",
    },
    recipient_phone: {
      type: "varchar",
    },
  },
  relations: {
    order_user_relation: {
      target: userString,
      type: "many-to-one",
      joinColumn: {
        name: "user_id",
        referencedColumnName: "user_id",
      },
    },
    order_orderDetail_relation: {
      target: orderDetailString,
      type: "one-to-many",
      inverseSide: "orderDetail_order_relation",
    },
    order_store_relation: {
      target: storeString,
      type: "many-to-one",
      joinColumn: {
        name: "store_id",
      },
      inverseSide: "store_order_relation",
    },
  },
})

module.exports = orderEntity
