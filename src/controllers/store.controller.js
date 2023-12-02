const { validationResult } = require("express-validator")
const {
  SuccessResponse,
  CreatedResponse,
} = require("../common/success.response")
const StoreService = require("../services/store.service")
const { getInfoData } = require("../utils")
const { UnprocessableContentResponse } = require("../common/error.response")
const getErrorMessage = require("../utils/getErrorMessage")

class StoreController {
  async getAllStore(req, res, next) {
    new SuccessResponse({
      metadata: await StoreService.getAllStore(),
    }).send({ res })
  }

  async getStoreInfo(req, res, next) {
    const store_id = req.params.id
    new SuccessResponse({
      metadata: await StoreService.getStoreInfo(store_id),
    }).send({ res })
  }

  async createStore(req, res, next) {
    const resultValidate = validationResult(req).array()
    if (resultValidate.length !== 0) {
      throw new UnprocessableContentResponse(getErrorMessage(resultValidate))
    }
    const { store_name, store_address } = req.body
    new CreatedResponse({
      metadata: await StoreService.createStore(store_name, store_address),
    }).send({ res })
  }

  async modifyStoreInfomation(req, res, next) {
    const resultValidate = validationResult(req).array()
    if (resultValidate.length !== 0) {
      throw new UnprocessableContentResponse(getErrorMessage(resultValidate))
    }
    const store_id = req.params.id
    const infomation = getInfoData({
      fileds: ["store_name", "store_address"],
      object: req.body,
    })
    new SuccessResponse({
      metadata: await StoreService.modifyStoreInfomation(store_id, infomation),
    }).send({ res })
  }

  async getAllOrderOfStore(req, res, next) {
    const store_id = req.params.id
    new SuccessResponse({
      metadata: await StoreService.getAllOrderOfStore(store_id),
    }).send({ res })
  }
}

module.exports = new StoreController()
