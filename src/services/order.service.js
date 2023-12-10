const { ErrorResponse, ConflictResponse } = require("../common/error.response");
const { orderString, orderDetailString, productPriceString, storeString } = require("../constants/entityName");
const { convertCreateOrderReturn, convertGetOrdersReturn } = require("../dto/orders.dto");
const { orderConstant } = require("../constants");
const AppDataSource = require("../db/data-source");
const userService = require("./user.service");

const relationOrderOderDetail = 'order_orderDetail_relation';
const relationOrderDetailProduct = 'order_orderDetail_relation.orderDetail_product_relation';
const relationOrderDetailProductSize = 'order_orderDetail_relation.orderDetail_productSize_relation'

const { Between, In } = require("typeorm");

class OrderService {
    constructor() {
        this.orderRepo = AppDataSource.getRepository(orderString);
        this.orderDetailRepo = AppDataSource.getRepository(orderDetailString);
        this.productPriceRepo = AppDataSource.getRepository(productPriceString);
        this.storeRepo = AppDataSource.getRepository(storeString);
    }

    async getAllOrder(page = 1, limit = 10, storeId) {
        const maxLimit = orderConstant.PAGINATION.MAX_LIMIT;

        // Pagination
        page = Math.max(1, parseInt(page)) || 1;
        limit = Math.min(maxLimit, Math.max(0, parseInt(limit)) || maxLimit);
        const skip = (page - 1) * limit;

        const orders = await this.orderRepo.find({ relations: [relationOrderOderDetail, relationOrderDetailProduct, relationOrderDetailProductSize], where: { store_id: storeId }, skip, take: limit });
        return convertGetOrdersReturn(orders);
    }

    async createOrder({ orderCode, orderStatus, orderAddress, setAddressDefault, storeId, recipientName, recipientPhone, setPhoneDefault, feeTransport, orderDetails, userId }) {
        // check existing Order
        const existingOrder = await this.orderRepo.findOne({ where: { order_code: orderCode } });
        if (existingOrder) {
            throw new ConflictResponse(orderConstant.ORDER_CONFLICT_MSG);
        }

        // Check existing store
        const existingStore = await this.storeRepo.findOne({ where: { store_id: storeId } });
        if (!existingStore) {
            throw new ErrorResponse('Store not found!', 404);
        }

        if (setAddressDefault || setPhoneDefault) {
            // Update address and phone for user
            await userService.modifyProfile(userId, {
                user_address: setAddressDefault ? orderAddress : undefined,
                user_phone: setPhoneDefault ? recipientPhone : undefined
            });
        }

        // calculate totalPrice in productDetail
        const totalPriceProduct = await this.calculateTotalPriceProduct(orderDetails)
        const orderPrice = totalPriceProduct + parseFloat(feeTransport);

        // Create new order
        const newOrder = this.orderRepo.create({
            order_code: orderCode,
            order_status: orderStatus,
            order_address: orderAddress,
            fee_transport: feeTransport,
            total_price_product: totalPriceProduct,
            order_price: orderPrice,
            order_date: new Date(),
            user_id: userId,
            store_id: storeId,
            recipient_name: recipientName,
            recipient_phone: recipientPhone
        })

        // Save order to db
        const savedOrder = await this.orderRepo.save(newOrder);

        // Create order detail
        const newOrderDetails = orderDetails.map(orderDetail => {
            return this.orderDetailRepo.create({
                quantity: orderDetail.quantityBuy,
                order_id: savedOrder.order_id,
                product_id: orderDetail.productId,
                product_size_id: orderDetail.productSizeId
            })
        })

        // Save orderDetail to db
        await this.orderDetailRepo.save(newOrderDetails);

        return convertCreateOrderReturn(savedOrder);
    }

    async changeStatusOrder(orderId, orderStatus) {
        const order = await this.orderRepo.findOne({ where: { order_id: orderId } });
        if (!order) {
            throw new ErrorResponse("Order not found", 404);
        }

        order.order_status = orderStatus;
        return await this.orderRepo.save(order);
    }

    async calculateTotalPriceProduct(orderDetails) {
        let totalProductPrice = 0;
        const productIds = orderDetails.map(item => item.productId);
        const sizeIds = orderDetails.map(item => item.productSizeId);

        const productPrices = await this.productPriceRepo.find({ where: { product_id: In(productIds), product_size_id: In(sizeIds) } });

        orderDetails.forEach(orderDetail => {
            const { productId, productSizeId, quantityBuy } = orderDetail;

            const matchingPrice = productPrices.find(
                price =>
                    price.product_id === productId && price.product_size_id === productSizeId
            );

            if (matchingPrice) {
                totalProductPrice += quantityBuy * matchingPrice.product_price;
            } else {
                throw new ErrorResponse(`product_id ${productId} with size_id ${productSizeId} no existing`, 404);
            }
        });

        // console.log({ totalProductPrice });
        return totalProductPrice;
    }

    async calculateTotalRevenueAndTotalOrder(storeId, startDate, endDate) {
        const paymentOrders = convertGetOrdersReturn(await this.orderRepo.find({
            where: {
                store_id: storeId,
                order_status: In(["payment", "done"]),
                order_date: Between(startDate, endDate)
            },
            relations: [relationOrderOderDetail, relationOrderDetailProduct, relationOrderDetailProductSize]
        }))

        const totalRevenue = paymentOrders.reduce((total, order) => {
            return total + order.order_price;
        }, 0);

        const productsInfo = {};

        paymentOrders.forEach(({ orderDetails }) => {
            orderDetails.forEach(({ product_id, product_name, size, quantity }) => {
                productsInfo[product_id] = productsInfo[product_id] || { product_id, product_name, size, quantity: 0 };
                productsInfo[product_id].quantity += quantity;
            });
        });

        const listProductInfo = Object.values(productsInfo);

        return { totalRevenue, totalOrder: paymentOrders.length, listProductInfo };
    }
}

module.exports = new OrderService();
