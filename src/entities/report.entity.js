const { EntitySchema } = require("typeorm")
const { reportString, storeString } = require("../constance/entityName.js")

const reportEntity = new EntitySchema({
  name: reportString,
  columns: {
    report_id: {
      type: "int",
      primary: true,
      generated: true
    },
    report_date: {
      type: "date"
    },
    report_revenue: {
      type: "varchar"
    },
    report_total_order: {
      type: "int"
    },
    report_desc: {
      type: "varchar"
    },
    store_id: {
      type: "int"
    }
  }, relations: {
    report_store_relation: {
      target: storeString,
      type: "many-to-one",
      joinColumn: {
        name: "store_id"
      },
      inverseSide: "store_user_relation"
    }
  }
})

module.exports = reportEntity