const { checkSchema } = require("express-validator")

const registerValidate = checkSchema({
  user_name: {
    notEmpty: true,
    isLength: {
      options: { min: 1, max: 20 },
    },
    isAlphanumeric: true,
    errorMessage: "Invalid username! Username must be alphanumeric characters.",
  },
  user_password: {
    isLength: {
      options: { min: 8, max: 20 },
    },
    errorMessage: "Password out of range 8 -> 20 character",
  },
  full_name: {
    notEmpty: true,
    isLength: {
      options: { min: 1, max: 20 },
    },
    matches: { options: /^[a-zA-Z0-9\s]+$/ },
    errorMessage: "Invalid name! Name must be alpha characters.",
  },
  user_phone: {
    isMobilePhone: {
      options: ["vi-VN"],
    },
    errorMessage: "Invaild phone number",
  },
  user_email: {
    isEmail: true,
    errorMessage: "Invalid email!",
  },
})

const loginValidate = checkSchema({
  user_name: {
    notEmpty: true,
    errorMessage: "Username is not empty!",
  },
  user_password: {
    notEmpty: true,
    errorMessage: "Password is not empty!",
  },
})

const forgotPasswordValidate = checkSchema({
  user_email: {
    isEmail: true,
    errorMessage: "Invalid email!",
  },
})
module.exports = {
  registerValidate,
  loginValidate,
  forgotPasswordValidate,
}
