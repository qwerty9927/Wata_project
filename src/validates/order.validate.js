const { check } = require("express-validator");
const { orderConstant } = require("../constants");
const util = require("util");

const options = {
    status: ["pending", "processing", "done", "cancelled", "shipping", "payment"],
    productSize: ['Small', 'Medium', 'Large']
}

const msgErr = {
    orderCode: orderConstant.ORDER_NOTIFY_VALIDATE.ORDER_CODE,
    orderStatus: util.format(orderConstant.ORDER_NOTIFY_VALIDATE.ORDER_STATUS, options.status.join('/')),
    orderAddress: orderConstant.ORDER_NOTIFY_VALIDATE.ORDER_ADDRESS,
    recipientName: orderConstant.ORDER_NOTIFY_VALIDATE.RECIPIENT_NAME,
    recipientPhone: orderConstant.ORDER_NOTIFY_VALIDATE.RECIPIENT_PHONE,
    feeTransport: orderConstant.ORDER_NOTIFY_VALIDATE.FEE_TRANSPORT,
    orderDetails: orderConstant.ORDER_NOTIFY_VALIDATE.ORDER_DETAIL.MAIN,
    orderDetail_productId: orderConstant.ORDER_NOTIFY_VALIDATE.ORDER_DETAIL.PRODUCT_ID,
    orderDetail_productSize: util.format(orderConstant.ORDER_NOTIFY_VALIDATE.ORDER_DETAIL.PRODUCT_SIZE, options.productSize.join('/')),
    orderDetail_quantityBuy: orderConstant.ORDER_NOTIFY_VALIDATE.ORDER_DETAIL.QUANTITY_BUY,
    setAddressDefault: orderConstant.ORDER_NOTIFY_VALIDATE.SET_ADDRESS_DEFAULT,
    setPhoneDefault: orderConstant.ORDER_NOTIFY_VALIDATE.SET_PHONE_DEFAULT
};

module.exports = {
    validatorForCreate: () => {
        return [
            check('storeId').isInt().withMessage('storeId'),
            check('orderCode').isString().withMessage(msgErr.orderCode),
            check('orderStatus').isIn(options.status).withMessage(msgErr.orderStatus),
            check('orderAddress').isString().withMessage(msgErr.orderAddress),
            check('recipientName').isString().withMessage(msgErr.recipientName),
            check('recipientPhone').isMobilePhone().withMessage(msgErr.recipientPhone),
            check('feeTransport').isFloat().withMessage(msgErr.feeTransport),
            check('setAddressDefault').isBoolean().withMessage(msgErr.setAddressDefault),
            check('setPhoneDefault').isBoolean().withMessage(msgErr.setPhoneDefault),
            check('orderDetails').isArray().withMessage(msgErr.orderDetails),
            check('orderDetail.*.productId').isInt().withMessage(msgErr.orderDetail_productId),
            check('orderDetail.*.productSize').isIn(options.productSize).withMessage(msgErr.orderDetail_productSize),
            check('orderDetail.*.quantityBuy').isInt().withMessage(msgErr.orderDetail_quantityBuy),
        ];
    },
    validatorForChangeStatus: () => {
        return [
            check('orderStatus').isIn(options.status).withMessage(msgErr.orderStatus)
        ]
    }
};
