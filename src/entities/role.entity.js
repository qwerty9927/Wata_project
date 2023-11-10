const { EntitySchema } = require("typeorm")
const { roleString } = require("../constance/entityName.js")

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
  }
})

module.exports = roleEntity