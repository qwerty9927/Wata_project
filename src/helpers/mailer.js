const nodemailer = require("nodemailer")
const config = require("../configs")

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: config.emailName,
    pass: config.emailPassword,
  },
})

module.exports = transporter