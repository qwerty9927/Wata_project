require("dotenv").config()
const express = require("express")
const app = express()

const { default: helmet } = require("helmet")
const cors = require("cors")
const morgan = require("morgan")
const path = require('path')

const logger = require("./helpers/logger")
const errorHandler = require("./helpers/errorHandler")
const Connection = require("./db/connect")

app.use(cors())
app.use(helmet())
// process.env.NODE_ENV == "development" ? app.use(morgan("dev")) : null

// database
Connection.getInstance()

app.use((req, res, next) => {
    logger.info(`${req.method} -- ${res.statusCode} -- ${req.url} `)
    next()
})

// router
app.use('/api/v1', require('./routes'));

// middleware handle error
app.use(errorHandler)

module.exports = app
