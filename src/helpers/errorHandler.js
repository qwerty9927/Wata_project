const { ErrorResponse } = require("../common/error.response")
const chalk = require("chalk")
const env = process.env.NODE_ENV
const logger = require("./logger")

module.exports = (error, req, res, next) => {

  if (!(error instanceof ErrorResponse) && env === "development") {
    console.log(chalk.bgRed("System error!"))
    console.error(error)
    error = {}
  }

  const code = error.code || 500
  const message = error.message || "Internal Server Error"
  const errors = error.errors || null

  logger.error(`${req.method} -- ${code} -- ${req.url} -- ${message}`)

  res.status(code).json({
    status: "Error",
    message,
    code,
    errors,
  })
}
