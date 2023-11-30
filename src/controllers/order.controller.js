const { BadRequest, UnprocessableContentResponse } = require("../common/error.response");
const { SuccessResponse } = require("../common/success.response");
const orderService = require("../services/order.service");

const { validationResult } = require("express-validator");

class OrderController {
    async getOrderByUserId(req, res, next) {
        const userId = req.user_id;
        const orderCode = req.query.orderCode;
        const result = !orderCode ? await orderService.getAllOrderByUserId(userId) : await orderService.getOrderByOrderCode(userId, orderCode);

        new SuccessResponse({
            metadata: result,
            code: 200
        }).send({ res });
    }

    async getAllOrder(req, res, next) {
        new SuccessResponse({
            metadata: await orderService.getAllOrder(),
            code: 200
        }).send({ res });
    }

    async postCreateOrder(req, res, next) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            // Convert validation errors to an array of error messages
            const errorMessages = errors.array().map((error) => error.msg);
            throw new UnprocessableContentResponse(errorMessages);
        }

        const { orderCode, orderStatus, orderAddress, setAddressDefault, storeId,
            recipientName, recipientPhone, setPhoneDefault, feeTransport, orderDetails } = req.body;

        const payload = {
            orderCode, orderStatus, orderAddress, setAddressDefault, storeId,
            recipientName, recipientPhone, setPhoneDefault, feeTransport, orderDetails,
            userId: req.user_id
        }

        const result = await orderService.createOrder(payload);

        new SuccessResponse({
            metadata: result,
            code: 201
        }).send({ res });
    }

    async putChangeOrderStatus(req, res, next) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            // Convert validation errors to an array of error messages
            const errorMessages = errors.array().map((error) => error.msg);
            throw new UnprocessableContentResponse(errorMessages);
        }

        const orderId = req.params.id;
        const orderStatus = req.body.orderStatus;
        await orderService.changeStatusOrder(orderId, orderStatus);
        new SuccessResponse({
            message: "Change status order success"
        }).send({ res });
    }
}

module.exports = new OrderController();