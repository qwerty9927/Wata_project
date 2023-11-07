const typeorm = require("typeorm")
const config = require("../configs")

const AppDataSource = new typeorm.DataSource({
  type: "mysql",
  host: config.db.host,
  port: config.db.port,
  username: config.db.user,
  password: config.db.password,
  database: config.db.name,
  entities: ["src/entity/*.js"]
})

module.exports = AppDataSource