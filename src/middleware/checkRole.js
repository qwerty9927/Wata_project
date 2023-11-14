const { ForbiddenResponse } = require("../common/error.response")

const checkRole = (roles = []) => {
  return (req, res, next) => {
    const userRole = req.role_name
    let isMatching = false
    roles.forEach(role => {
      if(role === userRole){
        isMatching = true
        next()
      }
    })
    !isMatching ? next(new ForbiddenResponse("Don't can access this route!")) : null
  }
}

module.exports = checkRole