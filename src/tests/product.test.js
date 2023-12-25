require("dotenv").config({ path: require("path").join(__dirname, "../../.env.test.local") })
const app = require("../app")
const request = require("supertest")

const login = async () => {
  const dataset = {
    user_name: "admin",
    user_password: "888888888",
  }
  const response = await request(app).post("/api/v1/auth/login").send(dataset)
  return response.body.metadata.token
}
const token = (async () => await login())()

describe("[Products] Get api testing", () => {
  test("Init connection", async () => {
    await token
  })

  test("Test case 1: Get product info", async () => {
    const response = await request(app).get("/api/v1/products/1")
    expect(response.statusCode).toBe(200)
    expect(response.body.metadata).toBeDefined()
  })

  test("Test case 2: Get products info", async () => {
    const response = await request(app).get("/api/v1/products")
    expect(response.statusCode).toBe(200)
    expect(response.body.metadata).toBeDefined()
  })
})

describe("[Products] Create product api testing", () => {
  // Standard data
  //{
  // 	productName: "Product name"
  //  productDesc: "Description"
  //  category: "food"
  //}

  test("Test case 1: Validate failed", async () => {
    const dataset = {
      productName: "",
      productDesc: "Description",
      category: "food",
    }
    const response = await request(app)
      .post("/api/v1/products")
      .set({ Authorization: `Bearer ${await token}` })
      .send(dataset)
    expect(response.statusCode).toBe(422)
    expect(response.body.errors).toBeDefined()
  })

  test("Test case 2: Create product success", async () => {
    const dataset = {
      productName: "Product name",
      productDesc: "Description",
      category: "food",
    }
    const response = await request(app)
      .post("/api/v1/products")
      .set({ Authorization: `Bearer ${await token}` })
      .send(dataset)
    expect(response.statusCode).toBe(201)
    expect(response.body.metadata).toBeDefined()
  })
})

describe("[Products] Update product api testing", () => {
  // Standard data
  //{
  //  productName: "New product name",
  //  productDesc: "New description",
  //  category: "drink"
  //}
  //id = 1

  test("Test case 1: Validate failed", async () => {
    const dataset = {
      productName: "",
      productDesc: "Description",
      category: "food",
    }
    const id = 1
    const response = await request(app)
      .put(`/api/v1/products/${id}`)
      .set({ Authorization: `Bearer ${await token}` })
      .send(dataset)
    expect(response.statusCode).toBe(422)
    expect(response.body.errors).toBeDefined()
  })
  test("Test case 2: Product is not existed", async () => {
    const dataset = {
      productName: "New product name",
      productDesc: "New description",
      category: "drink",
    }
    const id = 0
    const response = await request(app)
      .post(`/api/v1/products/${id}`)
      .set({ Authorization: `Bearer ${await token}` })
      .send(dataset)
    expect(response.statusCode).toBe(404)
  })
  test("Test case 3: Update product success", async () => {
    const dataset = {
      productName: "New product name",
      productDesc: "New description",
      category: "drink",
    }
    const id = 1
    const response = await request(app)
      .put(`/api/v1/products/${id}`)
      .set({ Authorization: `Bearer ${await token}` })
      .send(dataset)
    expect(response.statusCode).toBe(200)
    expect(response.body.metadata).toBeDefined()
  })
})

describe("[Products] Add price for product testing", () => {
  // Standard data
  // {
  // 	size: "Large",
  // 	price: 200000
  // }
  //id = 30

  test("Test case 1: Validate failed", async () => {
    const dataset = {
      size: "fakeSize",
      price: 200000,
    }
    const id = 30
    const response = await request(app)
      .post(`/api/v1/products/${id}/prices`)
      .set({ Authorization: `Bearer ${await token}` })
      .send(dataset)
    expect(response.statusCode).toBe(422)
    expect(response.body.errors).toBeDefined()
  })

  test("Test case 2: Product is not existed", async () => {
    const dataset = {
      size: "Large",
      price: 200000,
    }
    const id = 99
    const response = await request(app)
      .post(`/api/v1/products/${id}/prices`)
      .set({ Authorization: `Bearer ${await token}` })
      .send(dataset)
    expect(response.statusCode).toBe(404)
  })
  test("Test case 3: Product price was existed", async () => {
    const dataset = {
      size: "Small",
      price: 200000,
    }
    const id = 30
    const response = await request(app)
      .post(`/api/v1/products/${id}/prices`)
      .set({ Authorization: `Bearer ${await token}` })
      .send(dataset)
    expect(response.statusCode).toBe(409)
  })

  test("Test case 4: Add price for product success", async () => {
    const dataset = {
      size: "Large",
      price: 200000,
    }
    const id = 30
    const response = await request(app)
      .post(`/api/v1/products/${id}/prices`)
      .set({ Authorization: `Bearer ${await token}` })
      .send(dataset)
    expect(response.statusCode).toBe(200)
    expect(response.body.metadata).toBeDefined()
  })
})

describe("[Products] Delete product testing", () => {
  test("Test case 1: Product is not existed", async () => {
    // Standard data
    // id = 1
    const id = ""
    const response = await request(app)
      .delete(`/api/v1/products/${id}`)
      .set({ Authorization: `Bearer ${await token}` })
    expect(response.statusCode).toBe(404)
  })
  test("Test case 2: Delete product success", async () => {
    const id = 1
    const response = await request(app)
      .delete(`/api/v1/products/${id}`)
      .set({ Authorization: `Bearer ${await token}` })
    expect(response.statusCode).toBe(200)
  })
})
