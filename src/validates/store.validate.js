const { checkSchema } = require("express-validator")
const { isObjectEmpty } = require("../utils")

const createStoreValidate = checkSchema({
  store_name: {
    notEmpty: true,
    errorMessage: "Store name is not empty!",
  },
  store_address: {
    notEmpty: true,
    errorMessage: "Store address is not empty!",
  },
})

const modifyStoreInfomationValidate = checkSchema({
  store_name: {
    exists: {
      if: (value, { req }) => {
        if (isObjectEmpty(req.body)) {
          return true
        }
        return !!req.body.store_name
      },
    },
    isLength: {
      options: { min: 1, max: 20 },
    },
    matches: { options: /^[a-zA-Z0-9\s]+$/ },
    errorMessage: "Invalid name! Name must be alpha characters.",
  },
})

module.exports = {
  createStoreValidate,
  modifyStoreInfomationValidate,
}
