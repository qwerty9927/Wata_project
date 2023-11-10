const { EntitySchema } = require("typeorm")
const { storeString, userString, reportString } = require("../constance/entityName.js")

const storeEntity = new EntitySchema({
  name: storeString,
  columns: {
    store_id: {
      type: "int",
      primary: true,
      generated: true
    },
    store_name: {
      type: "varchar"
    },
    store_address: {
      type: "varchar"
    }
  },  
  relations: {
    store_user_relation: {
      target: userString,
      type: "one-to-many",
      inverseSide: "user_store_relation"
    },
    store_report_relation: {
      target: reportString,
      type: "one-to-many",
      inverseSide: "report_store_relation"
    }
  }
})

module.exports = storeEntity