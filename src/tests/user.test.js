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

describe("[Users] Get api testing", () => {
  test("Test case 1: Get user info", async () => {
    const response = await request(app)
      .get("/api/v1/users/me")
      .set({ Authorization: `Bearer ${await token}` })
    expect(response.statusCode).toBe(200)
    expect(response.body.metadata).toBeDefined()
  })
  test("Test case 2: Get users info", async () => {
    const response = await request(app)
      .get("/api/v1/users")
      .set({ Authorization: `Bearer ${await token}` })
    expect(response.statusCode).toBe(200)
    expect(response.body.metadata).toBeDefined()
  })
  test("Test case 3: Get orders of user", async () => {
    const response = await request(app)
      .get("/api/v1/users/order")
      .set({ Authorization: `Bearer ${await token}` })
    expect(response.statusCode).toBe(200)
    expect(response.body.metadata).toBeDefined()
  })
})

describe("[Users] Change password api testing", () => {
  // Standard data
  // {
  //   current_password: "888888888",
  //   new_password: "88888888",
  // }
  test("Test case 1: Validate failed", async () => {
    const dataset = {
      current_password: "",
      new_password: "88888888",
    }
    const response = await request(app)
      .patch("/api/v1/users/change-password")
      .set({ Authorization: `Bearer ${await token}` })
      .send(dataset)
    expect(response.statusCode).toBe(422)
    expect(response.body.errors).toBeDefined()
  })
  test("Test case 2: Old password not match", async () => {
    const dataset = {
      current_password: "fakePassword",
      new_password: "88888888",
    }
    const response = await request(app)
      .patch("/api/v1/users/change-password")
      .set({ Authorization: `Bearer ${await token}` })
      .send(dataset)
    expect(response.statusCode).toBe(400)
  })
  test("Test case 3: Change password successful", async () => {
    const dataset = {
      current_password: "888888888",
      new_password: "88888888",
    }
    const response = await request(app)
      .patch("/api/v1/users/change-password")
      .set({ Authorization: `Bearer ${await token}` })
      .send(dataset)
    expect(response.statusCode).toBe(200)
  })
})

describe("[Users] Change role api testing", () => {
  // Standard data
  // {
  //   user_id: "3",
  //   role_id: "3",
  // }
  test("Test case 1: Validate failed", async () => {
    const dataset = {
      user_id: "",
      role_id: "3",
    }
    const response = await request(app)
      .patch("/api/v1/users/change-role")
      .set({ Authorization: `Bearer ${await token}` })
      .send(dataset)
    expect(response.statusCode).toBe(422)
    expect(response.body.errors).toBeDefined()
  })
  test("Test case 2: User not found", async () => {
    const dataset = {
      user_id: "10",
      role_id: "3",
    }
    const response = await request(app)
      .patch("/api/v1/users/change-role")
      .set({ Authorization: `Bearer ${await token}` })
      .send(dataset)
    expect(response.statusCode).toBe(400)
  })
  test("Test case 3: Role not found", async () => {
    const dataset = {
      user_id: "3",
      role_id: "10",
    }
    const response = await request(app)
      .patch("/api/v1/users/change-role")
      .set({ Authorization: `Bearer ${await token}` })
      .send(dataset)
    expect(response.statusCode).toBe(400)
  })
  test("Test case 4: Change role successful", async () => {
    const dataset = {
      user_id: "3",
      role_id: "3",
    }
    const response = await request(app)
      .patch("/api/v1/users/change-role")
      .set({ Authorization: `Bearer ${await token}` })
      .send(dataset)
    expect(response.statusCode).toBe(200)
  })
})

describe("[Users] Modify information api testing", () => {
  // Standard data
  // {
  //   user_email: "newemail@gmail.com"
  // }
  test("Test case 1: Validate failed", async () => {
    const dataset = {
      user_email: "",
    }
    const response = await request(app)
      .patch("/api/v1/users/me")
      .set({ Authorization: `Bearer ${await token}` })
      .send(dataset)
    expect(response.statusCode).toBe(422)
    expect(response.body.errors).toBeDefined()
  })
  test("Test case 2: Email was existed", async () => {
    const dataset = {
      user_email: "tanvo9927@gmail.com",
    }
    const response = await request(app)
      .patch("/api/v1/users/me")
      .set({ Authorization: `Bearer ${await token}` })
      .send(dataset)
    expect(response.statusCode).toBe(400)
  })
  test("Test case 3: Modify information successful", async () => {
    const dataset = {
      user_email: "newemail@gmail.com",
    }
    const response = await request(app)
      .patch("/api/v1/users/me")
      .set({ Authorization: `Bearer ${await token}` })
      .send(dataset)
    expect(response.statusCode).toBe(200)
  })
})
