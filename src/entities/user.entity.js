const { EntitySchema } = require("typeorm")
const { userString, storeString } = require("../constance/entityName.js")

const userEntity = new EntitySchema({
  name: userString,
  columns: {
    user_id: {
      type: "int",
      primary: true,
      generated: true
    },
    user_name: {
      type: "varchar"
    },
    user_password: {
      type: "varchar"
    },
    full_name: {
      type: "varchar"
    },
    user_address: {
      type: "varchar"
    },
    user_phone: {
      type: "int"
    },
    user_email: {
      type: "varchar"
    },
    role_id: {
      type: "int"
    },
    store_id: {
      type: "int"
    }
  },  
  relations: {
    user_store_relation: {
      target: storeString,
      type: "many-to-one",
      joinColumn: {
        name: "store_id"
      },
      inverseSide: "store_report_relation"
    }
  }
})

module.exports = userEntity