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

describe("[Orders] Get orders testing", () => {
  test("[Orders] Test case 1: Get orders", async () => {
    const response = await request(app)
      .get("/api/v1/orders")
      .set({ Authorization: `Bearer ${await token}` })
    expect(response.statusCode).toBe(200)
    expect(response.body.metadata).toBeDefined()
  })
})

describe("[Orders] Create order api testing", () => {
  // Standard data
  //   {
  //     orderCode:"ORDER01",
  //     orderAddress:"24 Duong F, phuong C, tp THU DUC",
  //     setAddressDefault:true,
  //     recipientName:"A Van B",
  //     recipientPhone:"0987654332",
  //     setPhoneDefault:false,
  //     feeTransport:15000,
  //     storeId:1,
  //     orderDetails:[
  //         {
  //            productId:1,
  //            productSizeId:3,
  //            quantityBuy:1
  //         },
  //         {
  //            productId:8,
  //            productSizeId:1,
  //            quantityBuy:2
  //         }
  //     ]
  // }
  test("[Orders] Test case 1: Validate failed", async () => {
    const response = await request(app)
      .post("/api/v1/orders")
      .set({ Authorization: `Bearer ${await token}` })
    expect(response.statusCode).toBe(422)
    expect(response.body.errors).toBeDefined()
  })
  test("[Orders] Test case 2: Order was existed", async () => {
    const dataset = {
      orderCode: "ORDER01",
      orderAddress: "24 Duong F, phuong C, tp THU DUC",
      setAddressDefault: true,
      recipientName: "A Van B",
      recipientPhone: "0987654332",
      setPhoneDefault: false,
      feeTransport: 15000,
      storeId: 1,
      orderDetails: [
        {
          productId: 1,
          productSizeId: 3,
          quantityBuy: 1,
        },
        {
          productId: 8,
          productSizeId: 1,
          quantityBuy: 2,
        },
      ],
    }
    const response = await request(app)
      .post("/api/v1/orders")
      .set({ Authorization: `Bearer ${await token}` })
      .send(dataset)
    expect(response.statusCode).toBe(409)
    expect(response.body.errors).toBeDefined()
  })

  test("[Orders] Test case 3: Order is not existed", async () => {
    const dataset = {
      orderCode: "ORDER02",
      orderAddress: "24 Duong F, phuong C, tp THU DUC",
      setAddressDefault: true,
      recipientName: "A Van B",
      recipientPhone: "0987654332",
      setPhoneDefault: false,
      feeTransport: 15000,
      storeId: 9,
      orderDetails: [
        {
          productId: 1,
          productSizeId: 3,
          quantityBuy: 1,
        },
        {
          productId: 8,
          productSizeId: 1,
          quantityBuy: 2,
        },
      ],
    }
    const response = await request(app)
      .post("/api/v1/orders")
      .set({ Authorization: `Bearer ${await token}` })
      .send(dataset)
    expect(response.statusCode).toBe(404)
    expect(response.body.errors).toBeDefined()
  })

  test("[Orders] Test case 4: Create order successful", async () => {
    const dataset = {
      orderCode: "ORDER0",
      orderAddress: "24 Duong F, phuong C, tp THU DUC",
      setAddressDefault: true,
      recipientName: "A Van B",
      recipientPhone: "0987654332",
      setPhoneDefault: false,
      feeTransport: 15000,
      storeId: 1,
      orderDetails: [
        {
          productId: 1,
          productSizeId: 3,
          quantityBuy: 1,
        },
        {
          productId: 8,
          productSizeId: 1,
          quantityBuy: 2,
        },
      ],
    }
    const response = await request(app)
      .post("/api/v1/orders")
      .set({ Authorization: `Bearer ${await token}` })
      .send(dataset)
    expect(response.statusCode).toBe(201)
  })
})

describe("[Orders] Change status order api testing", () => {
  // Standard data
  // {
  //   orderStatus:"done"
  // }
  // id = 3
  test("[Orders] Test case 1: Validate failed", async () => {
    const id = 3
    const response = await request(app)
      .put(`/api/v1/orders/${id}`)
      .set({ Authorization: `Bearer ${await token}` })
    expect(response.statusCode).toBe(422)
    expect(response.body.errors).toBeDefined()
  })
  test("[Orders] Test case 2: Order is not existed", async () => {
    const dataset = {
      orderStatus: "done",
    }
    const id = 1
    const response = await request(app)
      .put(`/api/v1/orders/${id}`)
      .set({ Authorization: `Bearer ${await token}` })
      .send(dataset)
    expect(response.statusCode).toBe(404)
  })
  test("[Orders] Test case 3: Change status order successful", async () => {
    const dataset = {
      orderStatus: "done",
    }
    const id = 3
    const response = await request(app)
      .put(`/api/v1/orders/${id}`)
      .set({ Authorization: `Bearer ${await token}` })
      .send(dataset)
    expect(response.statusCode).toBe(200)
  })
})
