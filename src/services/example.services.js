const { ErrorResponse } = require("../common/error.response")
const { makeid } = require("../utils");

class ExampleService {
  getExample() {
    return "Hello";
  }
  getExample2() {
    throw new ErrorResponse()
  }
}

module.exports = new ExampleService