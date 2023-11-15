const { validationResult } = require("express-validator")

const { BadRequest } = require("../common/error.response")
const {
  CreatedResponse,
  SuccessResponse,
} = require("../common/success.response")
const AuthService = require("../services/auth.service")
const getErrorMessage = require("../utils/getErrorMessage")

class AuthController {
  static async register(req, res, next) {
    const resultValidate = validationResult(req).array()
    if (resultValidate.length === 0) {
      const { user_name, user_password, user_email, role_id, ...userInfo } = req.body
      new CreatedResponse({
        metadata: await AuthService.register(
          user_name,
          user_password,
          user_email,
          userInfo
        ),
      }).send({ res })
    } else {
      throw new BadRequest(getErrorMessage(resultValidate))
    }
  }

  static async login(req, res, next) {
    const resultValidate = validationResult(req).array()
    if (resultValidate.length === 0) {
      const { user_name, user_password } = req.body
      const token = await AuthService.login(
        user_name,
        user_password
      )
      new SuccessResponse({
        message: "Login success",
      }).send({
        res,
        cookies: { token },
      })
    } else {
      throw new BadRequest(getErrorMessage(resultValidate))
    }
  }

  static logout(req, res, next) {
    const token = AuthService.logout()
    new SuccessResponse({
      message: "Logout success",
    }).send({ res, cookies: { token } })
  }

  static async resetPassword(req, res, next) {
    const resultValidate = validationResult(req).array()
    if(resultValidate.length === 0){
      await AuthService.resetPassword(req.body.user_email)
      new SuccessResponse({
        message: "Reset password sucess"
      }).send({res})
    } else {
      throw new BadRequest(getErrorMessage(resultValidate))
    }
  }
}

module.exports = AuthController
