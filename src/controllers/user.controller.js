const { validationResult } = require("express-validator")
const { SuccessResponse } = require("../common/success.response")
const UserService = require("../services/user.service")
const getErrorMessage = require("../utils/getErrorMessage")
const { UnprocessableContentResponse } = require("../common/error.response")
const { getInfoData, isObjectEmpty } = require("../utils")

class UserController {
  async getUserInfo(req, res, next) {
    new SuccessResponse({
      metadata: await UserService.getUserInfo(req.user_id)
    }).send({ res })
  }

  async changeRole(req, res, next) {
    const resultValidate = validationResult(req).array()
    if (resultValidate.length !== 0) {
      throw new UnprocessableContentResponse(getErrorMessage(resultValidate))
    }
    const { user_id, role_id } = req.body
    new SuccessResponse({
      metadata: await UserService.changeRole(user_id, role_id)
    }).send({ res })
  }

  async modifyProfile(req, res, next) {
    const resultValidate = validationResult(req).array()
    if (resultValidate.length !== 0) {
      throw new UnprocessableContentResponse(getErrorMessage(resultValidate))
    }
    const profile = getInfoData({ fileds: ["full_name", "user_phone", "user_email", "user_address"], object: req.body })
    if (isObjectEmpty(profile)) {
      throw new UnprocessableContentResponse()
    }
    new SuccessResponse({
      metadata: await UserService.modifyProfile(req.user_id, profile)
    }).send({ res })
  }

  async changePassword(req, res, next) {
    const resultValidate = validationResult(req).array()
    if (resultValidate.length !== 0) {
      throw new UnprocessableContentResponse(getErrorMessage(resultValidate))
    }
    const { current_password, new_password } = req.body
    new SuccessResponse({
      metadata: await UserService.changePassword(req.user_id, current_password, new_password)
    }).send({ res })
  }

  async getAllUser(req, res, next) {
    new SuccessResponse({
      metadata: await UserService.getAllUser()
    }).send({ res })
  }

  async getMyOrderByUserId(req, res, next) {
    const userId = req.user_id;
    const orderCode = req.query.orderCode;
    const result = await UserService.getMyOrder(userId, orderCode);

    new SuccessResponse({
      metadata: result,
      code: 200
    }).send({ res });
  }
}

module.exports = new UserController()
