const app = require('../app');
const Connection = require('../db/connect');
const request = require('supertest');
const productService = require('../services/product.service');
const { ErrorResponse, UnprocessableContentResponse } = require('../common/error.response');

const main = 'products';

const uriApiV1 = '/api/v1';
const productRoute = `${uriApiV1}/${main}`;

beforeAll(async () => {
    await Connection.getInstance();
});

describe('Products api testing', () => {
    describe('GET /products', () => {
        test('[Products] Test case 1: Get all product success', async () => {
            const response = await request(app).get(productRoute);

            // Check res status code
            expect(response.status).toBe(200);

            // Check response metadata in body
            expect(response.body).toHaveProperty('metadata');
            expect(response.body.metadata).toBeInstanceOf(Array);

            // Check variable in metadata
            response.body.metadata.forEach((product) => {
                expect(product).toHaveProperty('product_id');
                expect(product).toHaveProperty('product_name');
                expect(product).toHaveProperty('product_slug');
                expect(product).toHaveProperty('product_desc');
                expect(product).toHaveProperty('category');
                expect(product).toHaveProperty('url_image');
                expect(product).toHaveProperty('sizes');
                expect(product.sizes).toBeInstanceOf(Array);
            });
        });

        test('[Products] Test case 2: Get product by category sucess', async () => {
            const response = await request(app).get(`${productRoute}?category=food`);

            // Check res status code
            expect(response.status).toBe(200);

            // Check response metadata in body
            expect(Array.isArray(response.body?.metadata)).toBe(true);

            // Check variable in metadata
            response.body?.metadata.forEach((product) => {
                expect(product).toHaveProperty('product_id');
                expect(product).toHaveProperty('product_name');
                expect(product).toHaveProperty('product_slug');
                expect(product).toHaveProperty('product_desc');
                expect(product).toHaveProperty('category');
                expect(product.category).toBe('food');
                expect(product).toHaveProperty('url_image');
                expect(product).toHaveProperty('sizes');
                expect(product.sizes).toBeInstanceOf(Array);
            });

        })

        test('[Products] Test case 3: Get empty product list', async () => {
            jest.spyOn(productService, 'findAllProduct').mockResolvedValue([]);

            const response = await request(app).get(productRoute);

            // Check res status code
            expect(response.status).toBe(200);

            // Check response metadata in body
            expect(Array.isArray(response.body?.metadata)).toBe(true);

            // Expect the response to have an empty metadata array
            expect(response.body?.metadata).toHaveLength(0);

            // Ensure that productService.findAllProduct was called
            expect(productService.findAllProduct).toHaveBeenCalled();


            // Restore the original findAllProduct method
            jest.restoreAllMocks();
        })
    })

    describe('GET /products/:id', () => {
        test('[Products] Test case 1: Get a product with valib ID', async () => {
            const productId = 1;
            const response = await request(app).get(`${productRoute}/${productId}`);
            expect(response.status).toBe(200);
        })

        test('[Products] Test case 2: Get a product with invalid ID', async () => {
            const productId = 'invalid_id';
            const response = await request(app).get(`${productRoute}/${productId}`);

            // Check res status code
            expect(response.status).toBe(404);

            // Check error message in body
            expect(response.body?.message).toBe("Product not found");
        });
    })

    describe('POST /products', () => {
        const dataSetProduct = {
            product_id: 'new_product_id',
            product_name: 'New Pizza',
            product_slug: 'new-pizza',
            product_image: null,
            product_desc: 'New pizza description',
            category: 'food'
        };

        test('[Products] Test case 1: Create a new product successfully', async () => {
            // Create a spy on createProduct and mock its resolved value
            jest.spyOn(productService, 'createProduct').mockResolvedValue(dataSetProduct);

            const response = await request(app)
                .post(productRoute)
                .send({
                    productName: 'New Pizza',
                    productDesc: 'New pizza description',
                    category: 'food'
                });

            // Check res status code
            expect(response.status).toBe(201);

            // Check response metadata in body
            expect(response.body).toHaveProperty('metadata');
            expect(response.body.metadata).toBeDefined();

            console.log(response.body.metadata);

            // Check variables in metadata
            expect(response.body.metadata).toHaveProperty('product_id', dataSetProduct.product_id);
            expect(response.body.metadata).toHaveProperty('product_name', dataSetProduct.product_name);
            expect(response.body.metadata).toHaveProperty('product_slug', dataSetProduct.product_slug);
            expect(response.body.metadata).toHaveProperty('product_desc', dataSetProduct.product_desc);
            expect(response.body.metadata).toHaveProperty('category', dataSetProduct.category);
            expect(response.body.metadata).toHaveProperty('product_image', dataSetProduct.product_image);

            // Restore the original createProduct method
            jest.restoreAllMocks();
        });

        test('[Products] Test case 2: Handle validation errors', async () => {
            const response = await request(app)
                .post(productRoute)
                .send({
                    // Invalid data to trigger validation error
                });

            // Check res status code
            expect(response.status).toBe(422);

            // Check error message in body
            expect(response.body?.message).toBe('Unprocessable Entity');
            expect(response.body?.errors).toBeDefined();
        });

        // Add more test cases for other scenarios, if needed
    });

    describe('POST /products/:id/prices', () => {
        const validProductId = 'valid_product_id';
        const invalidProductId = 'invalid_product_id';

        const priceData = {
            size: 'Medium',
            price: 25.99,
        };

        test('[Products] Test case 1: Add a new price successfully', async () => {
            // Create a spy on addProductPrice and mock its resolved value
            jest.spyOn(productService, 'addProductPrice').mockResolvedValue({
                product_id: validProductId,
                product_size_id: 1, // You should adjust this based on your actual logic
                price: priceData.price,
            });

            const response = await request(app)
                .post(`${productRoute}/${validProductId}/prices`)
                .send(priceData);

            // Check res status code
            expect(response.status).toBe(200);

            // Check response body
            expect(response.body).toHaveProperty('metadata');
            expect(response.body.metadata).toHaveProperty('product_id', validProductId);
            expect(response.body.metadata).toHaveProperty('product_size_id'); // Adjust based on your actual logic
            expect(response.body.metadata).toHaveProperty('price', priceData.price);

            // Ensure that productService.addProductPrice and validationResult.formatWith were called
            expect(productService.addProductPrice).toHaveBeenCalledWith(validProductId, priceData);

            // Restore the original methods
            jest.restoreAllMocks();
        });

        test('[Products] Test case 2: Handle validation errors', async () => {
            const response = await request(app)
                .post(`${productRoute}/${validProductId}/prices`)
                .send({
                    // Invalid data to trigger validation error
                });

            // Check res status code
            expect(response.status).toBe(422);

            // Check error message in body
            expect(response.body?.message).toBe('Unprocessable Entity');
            expect(response.body?.errors).toBeDefined();
        });

        test('[Products] Test case 3: Handle product not found', async () => {
            // Create a spy on addProductPrice and mock its rejected value
            const notFoundError = new ErrorResponse('Product not found', 404);
            jest.spyOn(productService, 'addProductPrice').mockRejectedValue(notFoundError);

            const response = await request(app)
                .post(`${productRoute}/${invalidProductId}/prices`)
                .send(priceData);

            // Check res status code
            expect(response.status).toBe(404);

            // Check error message in body
            expect(response.body?.message).toBe('Product not found');

            // Restore the original addProductPrice method
            jest.restoreAllMocks();
        });

        // Add more test cases for other scenarios, if needed
    });

    describe('PUT /products/:id', () => {
        const validProductId = 'valid_product_id';
        const invalidProductId = 'invalid_product_id';

        test('[Products] Test case 1: Update a product successfully', async () => {
            // Create a spy on updateProduct and mock its resolved value
            jest.spyOn(productService, 'updateProduct').mockResolvedValue();

            const response = await request(app)
                .put(`${productRoute}/${validProductId}`)
                .send({
                    productName: 'Updated Pizza',
                    productDesc: 'Updated pizza description',
                    category: 'food'
                });

            // Check res status code
            expect(response.status).toBe(200);

            // Check response body
            expect(response.body).toHaveProperty('message', 'Update product success');

            // Ensure that productService.updateProduct was called
            expect(productService.updateProduct).toHaveBeenCalledWith(validProductId, {
                productName: 'Updated Pizza',
                productDesc: 'Updated pizza description',
                category: 'food'
            });

            // Restore the original updateProduct method
            jest.restoreAllMocks();
        });

        test('[Products] Test case 2: Handle validation errors', async () => {
            const response = await request(app)
                .put(`${productRoute}/${validProductId}`)
                .send({
                    // Invalid data to trigger validation error
                });

            // Check res status code
            expect(response.status).toBe(422);

            // Check error message in body
            expect(response.body?.message).toBe('Unprocessable Entity');
            expect(response.body?.errors).toBeDefined();
        });

        test('[Products] Test case 3: Handle product not found', async () => {
            const response = await request(app)
                .put(`${productRoute}/${invalidProductId}`)
                .send({
                    productName: 'Updated Pizza',
                    productDesc: 'Updated pizza description',
                    category: 'food'
                });

            // Check res status code
            expect(response.status).toBe(404);

            // Check error message in body
            expect(response.body?.message).toBe('Product not found');
        });
    });

    describe('DELETE /products/:id', () => {
        const validProductId = 'valid_product_id';
        const invalidProductId = 'invalid_product_id';

        test('[Products] Test case 1: Delete a product successfully', async () => {
            // Create a spy on softDeleteOneProduct and mock its resolved value
            jest.spyOn(productService, 'softDeleteOneProduct').mockResolvedValue();

            const response = await request(app).delete(`${productRoute}/${validProductId}`);

            // Check res status code
            expect(response.status).toBe(200);

            // Check response body
            expect(response.body).toHaveProperty('message', 'Delete product success');

            // Ensure that productService.softDeleteOneProduct was called
            expect(productService.softDeleteOneProduct).toHaveBeenCalledWith(validProductId);

            // Restore the original softDeleteOneProduct method
            jest.restoreAllMocks();
        });

        test('[Products] Test case 2: Handle product not found', async () => {
            const response = await request(app).delete(`${productRoute}/${invalidProductId}`);

            // Check res status code
            expect(response.status).toBe(404);

            // Check error message in body
            expect(response.body?.message).toBe('Product not found');
        });
    });
});