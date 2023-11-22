const { ErrorResponse, ConflictResponse } = require("../common/error.response");
const { orderString, orderDetailString, userString, productPriceString } = require("../constants/entityName");
const { convertCreateOrderReturn, convertGetOrdersReturn, convertGetOneOrderReturn } = require("../dto/orders.dto");
const { orderConstant } = require("../constants");
const AppDataSource = require("../db/data-source");
const productService = require("./product.service");

const relationOrderOderDetail = 'order_orderDetail_relation';

class OrderService {
    constructor() {
        this.orderRepo = AppDataSource.getRepository(orderString);
        this.orderDetailRepo = AppDataSource.getRepository(orderDetailString);
        this.userRepo = AppDataSource.getRepository(userString);
        this.productPriceRepo = AppDataSource.getRepository(productPriceString);
    }

    async getAllOrderByUserId(userId) {
        const orders = await this.orderRepo.find({ where: { user_id: userId }, relations: [relationOrderOderDetail] })
        return convertGetOrdersReturn(orders);
        // return orders;
    }

    async getOrderByOrderCode(userId, orderCode) {
        const order = await this.orderRepo.findOne({ where: { user_id: userId, order_code: orderCode }, relations: [relationOrderOderDetail] });
        if (!order) {
            throw new ErrorResponse("Order not found!", 404);
        }
        return convertGetOneOrderReturn(order);
    }

    async createOrder({ orderCode, orderStatus, orderAddress, setAddressDefault, storeId, recipientName, recipientPhone, setPhoneDefault, feeTransport, orderDetails, userId }) {
        // check existing Order
        const existingOrder = await this.orderRepo.findOne({ where: { order_code: orderCode } });
        if (existingOrder) {
            throw new ConflictResponse(orderConstant.ORDER_CONFLICT_MSG);
        }

        if (setAddressDefault) {
            // Update address for user
        }

        if (setPhoneDefault) {
            // Update phone for user
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
                quantity_buy: orderDetail.quantityBuy,
                order_id: savedOrder.order_id,
                product_id: orderDetail.productId,
                product_size: orderDetail.productSize
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
        await this.orderRepo.save(order);
    }

    async calculateTotalPriceProduct(orderDetail) {
        let totalPrice = 0;
        for (let item of orderDetail) {
            const priceItem = await productService.getPriceProduct(item.productId, item.productSize);
            totalPrice += (priceItem * item.quantityBuy);
        }
        return totalPrice;
    }
}

module.exports = new OrderService();
