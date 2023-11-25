const { EntitySchema } = require("typeorm")
const { userString, storeString, roleString, orderString } = require("../constants/entityName.js")

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
    token: {
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
    },
    user_role_relation: {
      target: roleString,
      type: "many-to-one",
      joinColumn: {
        name: "role_id"
      },
      inverseSide: "role_user_relation"
    },
    user_order_relation: {
      target: orderString,
      type: "one-to-many",
      inverseSide: "order_user_relation"
    }
  }
})

module.exports = userEntity