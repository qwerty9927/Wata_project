const jwt = require("jsonwebtoken")
const { AuthFailureResponse } = require("../common/error.response")

const authorization = (req, res, next) => {
  const { token } = req.cookies
  jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
    if(!err){
      req.user_id = data.user_id
      req.role_name = data.role_name
      console.log(data)
    } else {
      next(new AuthFailureResponse())
    }
  })
  next()
}

module.exports = authorization
