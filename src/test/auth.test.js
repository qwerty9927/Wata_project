require("dotenv").config({path: require("path").join(__dirname, "../../.env")})
const request = require("supertest")
const app = require("../app")
const AuthService = require("../services/auth.service")

describe("Login api testing", () => {
  const dataset = {
    user_name: "abcdc",
    user_password: "8e1823e4",
  }
  test("[Login] Test case 1: Empty any field", async () => {
    const response = await request(app).post("/api/v1/auth/login")
    expect(response.statusCode).toBe(400)
    expect(response.body.errors).toBeDefined()
  })

  test("[Login] Test case 2: Username not found", async () => {
    AuthService.getUserRepository = jest.fn(() => ({}))
    // User not exist
    Object.prototype.findOne = jest.fn(() => null)
    const response = await request(app).post("/api/v1/auth/login").send(dataset)
    expect(response.statusCode).toBe(401)
  })

  test("[Login] Test case 3: Password not match", async () => {
    AuthService.getUserRepository = jest.fn(() => ({}))
    // User not exist
    Object.prototype.findOne = jest.fn(() => ({
      user_id: 11,
      user_name: 'abcdc',
      user_password: '$2b$10$SucLHtmBZkO98a47IQZvI.kHrS8nBYL1ofuzqAkZ1Vv3mP9o8fWEm',
      full_name: 'MinhTan',
      user_address: 'a/b/c',
      user_phone: 778070683,
      user_email: 'tanvo9927@gmail.com',
      role_id: 2,
      store_id: null,
      user_role_relation: { role_id: 2, role_name: 'Customer' }
    }))
    const response = await request(app).post("/api/v1/auth/login").send({
      user_name: dataset.user_name,
      user_password: dataset.user_password + "1234"
    })
    expect(response.statusCode).toBe(401)
  })

  test("[Login] Test case 4: Login success", async () => {
    AuthService.getUserRepository = jest.fn(() => ({}))
    // Found user
    Object.prototype.findOne = jest.fn(() => ({
      user_id: 11,
      user_name: 'abcdc',
      user_password: '$2b$10$SucLHtmBZkO98a47IQZvI.kHrS8nBYL1ofuzqAkZ1Vv3mP9o8fWEm',
      full_name: 'MinhTan',
      user_address: 'a/b/c',
      user_phone: 778070683,
      user_email: 'tanvo9927@gmail.com',
      role_id: 2,
      store_id: null,
      user_role_relation: { role_id: 2, role_name: 'Customer' }
    }))
    const response = await request(app).post("/api/v1/auth/login").send({
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
  const dataset = {
    user_name: "abcdc",
    user_password: "8e1823e4",
    full_name: "MinhTan",
    user_address: "a/b/c",
    user_phone: "0778070683",
    user_email: "tanvo9927@gmail.com"
  }
  test("[Register] Test case 1: Empty any field", async () => {
    const response = await request(app).post("/api/v1/auth/register")
    expect(response.statusCode).toBe(400)
    expect(response.body.errors).toBeDefined()
  })

  test("[Register] Test case 2: Conflict username or email", async () => {
    AuthService.getUserRepository = jest.fn(() => ({}))
    Object.prototype.findOneBy = jest.fn(() => ({
      user_id: 11,
      user_name: 'abcdc',
      user_password: '$2b$10$SucLHtmBZkO98a47IQZvI.kHrS8nBYL1ofuzqAkZ1Vv3mP9o8fWEm',
      full_name: 'MinhTan',
      user_address: 'a/b/c',
      user_phone: 778070683,
      user_email: 'tanvo9927@gmail.com',
      role_id: 2,
      store_id: null
    }))
    const response = await request(app).post("/api/v1/auth/register").send(dataset)
    expect(response.statusCode).toBe(409)
  })

  test("[Register] Test case 3: Register success", async () => {
    AuthService.getUserRepository = jest.fn(() => ({}))
    Object.prototype.findOneBy = jest.fn(() => null)
    Object.prototype.insert = jest.fn(() => true)
    const response = await request(app).post("/api/v1/auth/register").send({
      ...dataset,
      user_name: dataset.user_name + "1234"
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
  const dataset = {
    user_email: "tanvo9927a@gmail.com"
  }
  test("[Reset password] Test case 1: Empty any field", async () => {
    const response = await request(app).post("/api/v1/auth/forgot-password")
    expect(response.statusCode).toBe(400)
    expect(response.body.errors).toBeDefined()
  })

  test("[Reset password] Test case 2: Email is not signed", async () => {
    AuthService.getUserRepository = jest.fn(() => ({}))
    Object.prototype.findOneBy = jest.fn(() => null)
    const response = await request(app).post("/api/v1/auth/forgot-password").send({
      user_email: "abc@gmail.com"
    })
    expect(response.statusCode).toBe(400)
  })

  test("[Reset password] Test case 3: Reset password success", async () => {
    AuthService.getUserRepository = jest.fn(() => ({}))
    Object.prototype.findOneBy = jest.fn(() => ({
      user_id: 11,
      user_name: 'abcdc',
      user_password: '$2b$10$SucLHtmBZkO98a47IQZvI.kHrS8nBYL1ofuzqAkZ1Vv3mP9o8fWEm',
      full_name: 'MinhTan',
      user_address: 'a/b/c',
      user_phone: 778070683,
      user_email: 'tanvo9927@gmail.com',
      role_id: 2,
      store_id: null
    }))
    Object.prototype.update = jest.fn(() => true)
    const response = await request(app).post("/api/v1/auth/forgot-password").send(dataset)
    expect(response.statusCode).toBe(200)
  })
})
