const getErrorMessage = (errors) => {
  const responseMessage = {}
  errors.forEach(error => {
    responseMessage[error.path] = error.msg
  })
  return responseMessage
}

module.exports = getErrorMessage
