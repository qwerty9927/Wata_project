const request = require("supertest")
const { messageResponse } = require("../constance")
const host = "http://127.0.0.1:3000"

describe("Login api testing", () => {
  const dataset = {
    user_name: "abcdc",
    user_password: "1dc7511c",
  }
  test("[Login] Test case 1: Empty all field", async () => {
    const response = await request(host).post("/api/v1/auth/login")
    expect(response.statusCode).toBe(400)
    expect(response.body.errors).toBeDefined()
  })
  test("[Login] Test case 2: Empty username", async () => {
    const response = await request(host).post("/api/v1/auth/login").send({
      user_password: dataset.user_password,
    })
    expect(response.statusCode).toBe(400)
    expect(response.body.errors).toBeDefined()
  })
  test("[Login] Test case 3: Empty password", async () => {
    const response = await request(host).post("/api/v1/auth/login").send({
      user_name: dataset.user_name,
    })
    expect(response.statusCode).toBe(400)
    expect(response.body.errors).toBeDefined()
  })

  test("[Login] Test case 4: Username not found", async () => {
    const response = await request(host).post("/api/v1/auth/login").send({
      user_name: "12345",
      user_password: dataset.user_password,
    })
    expect(response.statusCode).toBe(401)
    expect(response.body.message).toEqual(messageResponse.login.authFailure)
  })

  test("[Login] Test case 5: Password not match", async () => {
    const response = await request(host).post("/api/v1/auth/login").send({
      user_name: dataset.user_name,
      user_password: "12345",
    })
    expect(response.statusCode).toBe(401)
    expect(response.body.message).toEqual(messageResponse.login.authFailure)
  })

  test("[Login] Test case 6: Login success", async () => {
    const response = await request(host).post("/api/v1/auth/login").send({
      user_name: dataset.user_name,
      user_password: dataset.user_password,
    })
    expect(response.statusCode).toBe(200)
    expect(response.headers["set-cookie"].toString()).toMatch(
      /token=([a-zA-Z0-9-_=]+\.[a-zA-Z0-9-_=]+\.[a-zA-Z0-9-_.+/=]+);/
    )
  })
})

describe("Register api testing", () => {

  test("[Register] Test case 1: Empty all field", async () => {
    const response = await request(host).post("/api/v1/auth/register")
    expect(response.statusCode).toBe(400)
    expect(response.body.errors).toBeDefined()
  })

  test("[Register] Test case 2: Conflict username or email", async () => {
    const response = await request(host).post("/api/v1/auth/register").send({
      user_name: "abcdc",
      user_password: "12345678",
      full_name: "MinhTan",
      user_address: "a/b/c",
      user_phone: "0778070683",
      user_email: "tanvo9927@gmail.com"
    })
    expect(response.statusCode).toBe(409)
    expect(response.body.message).toEqual(messageResponse.register.conflictUser)
  })

  test("[Register] Test case 3: Register success", async () => {
    const response = await request(host).post("/api/v1/auth/register").send({
      user_name: "abcdc5",
      user_password: "12345678",
      full_name: "MinhTan",
      user_address: "a/b/c",
      user_phone: "0778070683",
      user_email: "tanvo99275@gmail.com"
    })
    expect(response.statusCode).toBe(201)
    expect(response.body.metadata).toEqual({
      full_name: "MinhTan",
      user_address: "a/b/c",
      user_phone: "0778070683",
    })
  })
})

describe("Reset password api testing", () => {

  test("[Reset password] Test case 1: Empty all field", async () => {
    const response = await request(host).post("/api/v1/auth/forgot-password")
    expect(response.statusCode).toBe(400)
    expect(response.body.errors).toBeDefined()
  })

  test("[Reset password] Test case 2: Email is not signed", async () => {
    const response = await request(host).post("/api/v1/auth/forgot-password").send({
      user_email: "tanvo9927a@gmail.com"
    })
    expect(response.statusCode).toBe(400)
    expect(response.body.message).toEqual(messageResponse.resetPassword.email)
  })

  test("[Reset password] Test case 3: Reset password success", async () => {
    const response = await request(host).post("/api/v1/auth/forgot-password").send({
      user_email: "tanvo9927@gmail.com"
    })
    expect(response.statusCode).toBe(200)
  })
})
