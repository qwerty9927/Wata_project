const { SuccessResponse } = require("../common/success.response")
const ExampleService = require("../services/example.services")

class ExampleControler {
  getExample(req, res, next) {
    new SuccessResponse({
      metadata: ExampleService.getExample()
    }).send({ res })
  }

  getExample2(req, res, next) {
    new SuccessResponse({
      metadata: ExampleService.getExample2()
    }).send({ res })
  }
  async test(req, res, next) {
    new SuccessResponse({
      metadata: await ExampleService.test()
    }).send({ res })
  }
}

module.exports = new ExampleControler()
