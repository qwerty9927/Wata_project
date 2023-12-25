require("dotenv").config({ path: require("path").join(__dirname, "../../.env.test.local") })
const request = require("supertest")
const app = require("../app")

const login = async () => {
  const dataset = {
    user_name: "admin",
    user_password: "888888888",
  }
  const response = await request(app).post("/api/v1/auth/login").send(dataset)
  return response.body.metadata.token
}
const token = (async () => await login())()

describe("[Auth] Login api testing", () => {
  // Standard data
  // {
  //   user_name: "admin",
  //   user_password: "888888888",
  // }
  test("Test case 1: Validate failed", async () => {
    const dataset = {
      user_name: "",
      user_password: "",
    }
    const response = await request(app).post("/api/v1/auth/login").send(dataset)
    expect(response.statusCode).toBe(422)
    expect(response.body.errors).toBeDefined()
  })

  test("Test case 2: Username not found", async () => {
    const dataset = {
      user_name: "fakeUsername",
      user_password: "888888888",
    }
    const response = await request(app).post("/api/v1/auth/login").send(dataset)
    expect(response.statusCode).toBe(401)
  })

  test("Test case 3: Password not match", async () => {
    const dataset = {
      user_name: "admin",
      user_password: "fakePassword",
    }
    const response = await request(app).post("/api/v1/auth/login").send(dataset)
    expect(response.statusCode).toBe(401)
  })

  test("Test case 4: Login success", async () => {
    const dataset = {
      user_name: "admin",
      user_password: "888888888",
    }
    const response = await request(app).post("/api/v1/auth/login").send(dataset)
    expect(response.statusCode).toBe(200)
    expect(response.body.metadata.token).toMatch(/[a-zA-Z0-9-_=]+\.[a-zA-Z0-9-_=]+\.[a-zA-Z0-9-_.+/=]+/)
  })
})

describe("[Auth] Register api testing", () => {
  // Standard data
  // {
  //   user_name:"Staff1",
  //   user_password:"888888888",
  //   full_name:"TestUser",
  //   user_phone:"0342800652",
  //   user_email:"staff1@gmail.com"
  // }
  test("Test case 1: Validate failed", async () => {
    const response = await request(app).post("/api/v1/auth/register")
    expect(response.statusCode).toBe(422)
    expect(response.body.errors).toBeDefined()
  })

  test("Test case 2: Username or email was existed", async () => {
    const dataset = {
      user_name: "admin",
      user_password: "888888888",
      full_name: "MinhTan",
      user_address: "a/b/c",
      user_phone: "0778070683",
      user_email: "tanvo9927@gmail.com",
    }
    const response = await request(app).post("/api/v1/auth/register").send(dataset)
    expect(response.statusCode).toBe(409)
  })

  test("Test case 3: Register success", async () => {
    const dataset = {
      user_name: "Staff1",
      user_password: "888888888",
      full_name: "TestUser",
      user_phone: "0342800652",
      user_email: "staff1@gmail.com",
    }
    const response = await request(app).post("/api/v1/auth/register").send(dataset)
    expect(response.statusCode).toBe(201)
    expect(response.body.metadata).toBeDefined()
  })
})

describe("[Auth] Reset password api testing", () => {
  // Standard data
  // {
  //   user_email: "tanvo9927@gmail.com",
  // }
  test("Test case 1: Validate failed", async () => {
    const response = await request(app).post("/api/v1/auth/forgot-password")
    expect(response.statusCode).toBe(422)
    expect(response.body.errors).toBeDefined()
  })

  test("Test case 2: Email is not signed", async () => {
    const dataset = {
      user_email: "fakeeamil@gmail.com",
    }
    const response = await request(app).post("/api/v1/auth/forgot-password").send(dataset)
    expect(response.statusCode).toBe(400)
  })

  test("Test case 3: Reset password success", async () => {
    const dataset = {
      user_email: "tanvo9927@gmail.com",
    }
    const response = await request(app).post("/api/v1/auth/forgot-password").send(dataset)
    expect(response.statusCode).toBe(200)
  })
})

describe("[Auth] Logout api testing", () => {
  test("Test case 1: Logout success", async () => {
    const response = await request(app)
      .post("/api/v1/auth/logout")
      .set({ Authorization: `Bearer ${await token}` })
    expect(response.statusCode).toBe(200)
  })
})
