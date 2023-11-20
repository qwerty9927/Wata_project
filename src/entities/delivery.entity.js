const { EntitySchema } = require("typeorm")
const { deliveryString } = require("../constante/entityName.js")

const deliveryEntity = new EntitySchema({
  name: deliveryString,
  columns: {
    delivery_id: {
      type: "int",
      primary: true,
      generated: true
    },
    sender_name: {
      type: "varchar"
    },
    sender_phone: {
      type: "int"
    },
    recipient_name: {
      type: "varchar"
    },
    recipient_phone: {
      type: "int"
    },
    recipient_address: {
      type: "varchar"
    },
    delivery_date: {
      type: "date"
    }
  }
})

module.exports = deliveryEntity