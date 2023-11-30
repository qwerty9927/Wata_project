const { EntitySchema } = require("typeorm")
const { reportString, storeString, reportDetailString } = require("../constants/entityName.js")

const reportEntity = new EntitySchema({
  name: reportString,
  columns: {
    report_id: {
      type: "int",
      primary: true,
      generated: true
    },
    create_date: {
      type: "date"
    },
    start_date: {
      type: "date"
    },
    end_date: {
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
    },
    report_reportDetail_relation: {
      target: reportDetailString,
      type: "one-to-many",
      inverseSide: "reportDetail_report_relation"
    }
  }
})

module.exports = reportEntity