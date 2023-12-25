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

describe("[Reports] Get api testing", () => {
  // Standard data
  //id = 1
  test("Test case 1: Report is not existed", async () => {
    const id = 99
    const response = await request(app)
      .get(`/api/v1/reports/${id}`)
      .set({ Authorization: `Bearer ${await token}` })
    expect(response.statusCode).toBe(404)
  })
  test("Test case 2: Get report info", async () => {
    const id = 3
    const response = await request(app)
      .get(`/api/v1/reports/${id}`)
      .set({ Authorization: `Bearer ${await token}` })
    expect(response.statusCode).toBe(200)
    expect(response.body.metadata).toBeDefined()
  })
  test("Test case 3: Get reports info", async () => {
    const response = await request(app)
      .get("/api/v1/reports")
      .set({ Authorization: `Bearer ${await token}` })
    expect(response.statusCode).toBe(200)
    expect(response.body.metadata).toBeDefined()
  })
})
describe("[Reports] Create report api testing", () => {
  // Standard data
  // {
  //   reportDesc:"report 01 .....................",
  //   storeId:1,
  //   startDateString:"2023-12-01",
  //   endDateString:"2023-12-07"
  // }
  test("Test case 1: Validate failed", async () => {
    const dataset = {
      reportDesc: "",
      storeId: 1,
      startDateString: "2023-12-01",
      endDateString: "2023-12-07",
    }
    const response = await request(app)
      .post(`/api/v1/reports`)
      .set({ Authorization: `Bearer ${await token}` })
      .send(dataset)
    expect(response.statusCode).toBe(422)
  })
  test("Test case 2: Store is not existed", async () => {
    const dataset = {
      reportDesc: "report 01 .....................",
      storeId: 99,
      startDateString: "2023-12-01",
      endDateString: "2023-12-07",
    }
    const response = await request(app)
      .post(`/api/v1/reports`)
      .set({ Authorization: `Bearer ${await token}` })
      .send(dataset)
    expect(response.statusCode).toBe(404)
  })
  test("Test case 3: Create report successful", async () => {
    const dataset = {
      reportDesc: "report 01 .....................",
      storeId: 1,
      startDateString: "2023-12-01",
      endDateString: "2023-12-07",
    }
    const response = await request(app)
      .post(`/api/v1/reports`)
      .set({ Authorization: `Bearer ${await token}` })
      .send(dataset)
    expect(response.statusCode).toBe(201)
    expect(response.body.metadata).toBeDefined()
  })
})
