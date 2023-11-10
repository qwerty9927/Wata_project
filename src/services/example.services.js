const { ErrorResponse } = require("../common/error.response")
const Connection = require("../db/connect")
const { userString, roleString, orderDetailString, orderString, productSizeString, productString, deliveryString, storeString, reportString } = require("../constance/entityName")
const { makeid } = require("../utils");

class ExampleService {
  getExample() {
    return "Hello";
  }
  getExample2() {
    throw new ErrorResponse()
  }
  async test() {
    // Query relation
    // return await Connection.getInstance().getRepository(storeString).find({
    //   relations: {
    //     store_report_relation: true
    //   }
    // })

    // Query table
    return await Connection.getInstance().getRepository(storeString).find()
  }
}

module.exports = new ExampleService
