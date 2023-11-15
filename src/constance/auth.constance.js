const messageResponse = {
  register: {
    conflictUser: "User is existed!"
  },
  login: {
    authFailure: "Username or password is not correct!"
  },
  resetPassword: {
    email: "Email is not signed!"
  }
}

module.exports = {
  messageResponse
}