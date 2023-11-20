const { EntitySchema } = require("typeorm")
const { roleString, userString } = require("../constante/entityName.js")

const roleEntity = new EntitySchema({
  name: roleString,
  columns: {
    role_id: {
      type: "int",
      primary: true,
      generated: true
    },
    role_name: {
      type: "varchar"
    }
  },
  relations: {
    role_user_relation: {
      target: userString,
      type: "one-to-many",
      inverseSide: "user_role_relation"
    }
  }
})

module.exports = roleEntity