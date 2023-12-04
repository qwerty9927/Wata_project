const http = require("http")
const app = require("./src/app")
const config = require("./src/configs")

const server = http.createServer(app)
const PORT = config.server.port || 3000

server.listen(PORT, config.server.host, () => {
  console.log(`Server is running on port ${PORT}`)
})