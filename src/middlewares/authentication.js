const jwt = require("jsonwebtoken")
const { AuthFailureResponse } = require("../common/error.response")
const Connection = require("../db/connect")
const { userString } = require("../constants/entityName")
const bcrypt = require("bcrypt")
const config = require("../configs")

const authentication = async (req, res, next) => {
  const token = req.headers?.authorization?.split(" ")[1]
  return new Promise((resolve, reject) => {
    jwt.verify(token, config.jwtSecret, (err, data) => {
      if (err) {
        reject(err)
      }
      resolve(data)
    })
  })
    .then(async (data) => {
      const foundUser = await (await Connection.getInstance())
        .getRepository(userString)
        .findOneBy({
          user_id: data.user_id,
        })
      if (!foundUser) {
        return next(new AuthFailureResponse())
      }
      const isMatching = await bcrypt.compare(token, foundUser.token)
      if (!isMatching) {
        return next(new AuthFailureResponse())
      }
      req.user_id = data.user_id
      req.role_name = data.role_name
      next()
    })
    .catch((err) => {
      next(new AuthFailureResponse())
    })
}

module.exports = authentication
