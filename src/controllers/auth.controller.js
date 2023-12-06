const { validationResult } = require("express-validator")

const { UnprocessableContentResponse } = require("../common/error.response")
const {
  CreatedResponse,
  SuccessResponse,
} = require("../common/success.response")
const AuthService = require("../services/auth.service")
const getErrorMessage = require("../utils/getErrorMessage")
const { getInfoData } = require("../utils")

class AuthController {
  async register(req, res, next) {
    const resultValidate = validationResult(req).array()
    if (resultValidate.length !== 0) {
      throw new UnprocessableContentResponse(getErrorMessage(resultValidate))
    }
    const profile = getInfoData({fileds: ["user_name", "user_password", "full_name", "user_phone", "user_email", "user_address", "user_phone"], object: req.body})
    const { user_name, user_password, user_email, ...userInfo } = profile
    new CreatedResponse({
      metadata: await AuthService.register(
        user_name,
        user_password,
        user_email,
        userInfo
      ),
    }).send({ res })
  }

  async login(req, res, next) {
    const resultValidate = validationResult(req).array()
    if (resultValidate.length !== 0) {
      throw new UnprocessableContentResponse(getErrorMessage(resultValidate))
    }
    const { user_name, user_password } = req.body
    const token = await AuthService.login(
      user_name,
      user_password
    )
    new SuccessResponse({
      message: "Login success",
      metadata: {token}
    }).send({ res })
  }

  async logout(req, res, next) {
    await AuthService.logout(req.user_id)
    new SuccessResponse({
      message: "Logout success",
    }).send({ res })
  }

  async requestChangePassword(req, res, next) {
    const resultValidate = validationResult(req).array()
    if (resultValidate.length !== 0) {
      throw new UnprocessableContentResponse(getErrorMessage(resultValidate))
    }
    await AuthService.requestChangePassword(req.body.user_email)
    new SuccessResponse({
      message: "Send mail success"
    }).send({ res })
  }

  async resetPassword(req, res, next) {
    const resultValidate = validationResult(req).array()
    if (resultValidate.length !== 0) {
      throw new UnprocessableContentResponse(getErrorMessage(resultValidate))
    }
    const { email, token } = req.query
    await AuthService.verificationOfChange(email, token)
    new SuccessResponse({
      message: "Reset password sucess"
    }).send({ res })
  }
}

module.exports = new AuthController()
