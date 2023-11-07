
const config = {
  db: {
    host: process.env.MYSQL_HOST,
    name: process.env.MYSQL_NAME,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    port: process.env.MYSQL_PORT,
  },
  server: {
    host: process.env.API_HOST,
    port: process.env.EXPRESS_PORT,
  }
}

module.exports = config