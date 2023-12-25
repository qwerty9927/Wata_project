const { checkSchema } = require("express-validator")
const { isObjectEmpty } = require("../utils")

const changeRoleValidate = checkSchema({
  role_id: {
    notEmpty: true,
    isNumeric: true,
    errorMessage: "Role id must be number!",
  },
  user_id: {
    notEmpty: true,
    isNumeric: true,
    errorMessage: "User id must be number!",
  },
})

const changePasswordValidate = checkSchema({
  current_password: {
    notEmpty: true,
    errorMessage: "Password is not empty!",
  },
  new_password: {
    isLength: {
      options: { min: 8, max: 20 },
    },
    errorMessage: "Password out of range 8 -> 20 character",
  },
})

const modifyProfileValidate = checkSchema({
  full_name: {
    exists: {
      if: (value, { req }) => {
        if (isObjectEmpty(req.body)) {
          return true
        }
        if (req.body.full_name === "") {
          return true
        }
        return !!req.body.full_name
      },
    },
    isLength: {
      options: { min: 1, max: 20 },
    },
    isAlphanumeric: true,
    errorMessage: "Invalid name! Name must be alpha characters.",
  },
  user_phone: {
    exists: {
      if: (value, { req }) => {
        if (isObjectEmpty(req.body)) {
          return true
        }
        if (req.body.user_phone === "") {
          return true
        }
        return !!req.body.user_phone
      },
    },
    isMobilePhone: {
      options: ["vi-VN"],
    },
    errorMessage: "Invaild phone number",
  },
  user_email: {
    exists: {
      if: (value, { req }) => {
        if (isObjectEmpty(req.body)) {
          return true
        }
        if (req.body.user_email === "") {
          return true
        }
        return !!req.body.user_email
      },
    },
    isEmail: true,
    errorMessage: "Invalid email!",
  },
})

module.exports = {
  changeRoleValidate,
  changePasswordValidate,
  modifyProfileValidate,
}
