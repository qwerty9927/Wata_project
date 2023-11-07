const { ReasonPhrases, StatusCodes } = require("../utils/httpStatus")
const logger = require("../helpers/logger")

class SuccessResponse {
  constructor({ message = ReasonPhrases.OK, code = StatusCodes.OK, metadata = {} }) {
    this.payload = {
      message,
      code,
      metadata
    }
  }

  send({ res, header = {}, cookies = {} }) {
    // Handle cookie
    Object.entries(cookies).forEach(([key, value]) => {
      if (value) {
        res.cookie(key, value)
      } else {
        res.clearCookie(key)
      }
    })
    return res.status(this.payload.code).json(this.payload)
  }
}

class CreatedResponse extends SuccessResponse {
  constructor({ message = ReasonPhrases.CREATED, code = StatusCodes.CREATED, metadata = {} }) {
    super({ message, code, metadata })
  }
}

module.exports = {
  SuccessResponse,
  CreatedResponse
}