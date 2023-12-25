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

describe("[Stores] Get api testing", () => {
  // Standard data
  //id = 1
  test("Test case 1: Store is not existed", async () => {
    const id = 99
    const response = await request(app).get(`/api/v1/stores/${id}`)
    expect(response.statusCode).toBe(400)
  })
  test("Test case 2: Get store info", async () => {
    const id = 1
    const response = await request(app).get(`/api/v1/stores/${id}`)
    expect(response.statusCode).toBe(200)
    expect(response.body.metadata).toBeDefined()
  })
  test("Test case 3: Get stores info", async () => {
    const response = await request(app).get("/api/v1/stores")
    expect(response.statusCode).toBe(200)
    expect(response.body.metadata).toBeDefined()
  })
  test("Test case 4: Get orders of store", async () => {
    const id = 1
    const response = await request(app)
      .get(`/api/v1/stores/${id}/orders`)
      .set({ Authorization: `Bearer ${await token}` })
    expect(response.statusCode).toBe(200)
    expect(response.body.metadata).toBeDefined()
  })
})

describe("[Stores] Create store api testing", () => {
  // Standard data
  // {
  //    store_name: "abc",
  //    store_address: "a/b/c/d"
  // }
  test("Test case 1: Validate failed", async () => {
    const response = await request(app)
      .post("/api/v1/stores")
      .set({ Authorization: `Bearer ${await token}` })
    expect(response.statusCode).toBe(422)
    expect(response.body.errors).toBeDefined()
  })
  test("Test case 2: Create store successful", async () => {
    const dataset = {
      store_name: "abc",
      store_address: "a/b/c/d",
    }
    const response = await request(app)
      .post("/api/v1/stores")
      .set({ Authorization: `Bearer ${await token}` })
      .send(dataset)
    expect(response.statusCode).toBe(201)
  })
})

describe("[Stores] Modify information api testing", () => {
  // Standard data
  // {
  //    store_name: "abc",
  //    store_address: "a/b/c/d"
  // }
  test("Test case 1: Validate failed", async () => {
    const response = await request(app)
      .patch("/api/v1/stores/1")
      .set({ Authorization: `Bearer ${await token}` })
    expect(response.statusCode).toBe(422)
    expect(response.body.errors).toBeDefined()
  })
  test("Test case 2: Modify information successful", async () => {
    const dataset = {
      store_name: "abc",
      store_address: "a/b/c/d",
    }
    const response = await request(app)
      .patch("/api/v1/stores/1")
      .set({ Authorization: `Bearer ${await token}` })
      .send(dataset)
    expect(response.statusCode).toBe(200)
  })
})
