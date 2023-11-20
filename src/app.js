require("dotenv").config()
const express = require("express")
const app = express()

const { default: helmet } = require("helmet")
const cors = require("cors")
const morgan = require("morgan")
const path = require("path")
const cookieParse = require("cookie-parser")

const logger = require("./helpers/logger")
const errorHandler = require("./helpers/errorHandler")
const Connection = require("./db/connect")

app.use(cors())
app.use(helmet())
app.use(cookieParse())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
// process.env.NODE_ENV == "development" ? app.use(morgan("dev")) : null

// database
(async () => {
  await Connection.getInstance();
})()

app.use((req, res, next) => {
  logger.info(`${req.method} -- ${res.statusCode} -- ${req.url} `)
  next()
})

// router
app.use("/api/v1", require("./routes"))

// middleware handle error
app.use(errorHandler)

module.exports = app
