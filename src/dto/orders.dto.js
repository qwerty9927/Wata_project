const { getInfoData } = require("../utils");
const config = require("../configs");

const convertCreateOrderReturn = (order) => {
    if (!order) return null;
    const orderInfo = getInfoData({
        fileds: ['order_id', 'order_code', 'order_price', 'order_date'],
        object: order
    });

    return orderInfo;
};

const convertGetOneOrderReturn = (order) => {
    const orderInfo = getInfoData({
        fileds: ['order_id', 'order_code', 'order_status', 'order_address', 'fee_transport', 'total_price_product',
            'order_price', 'order_date', 'store_id', 'recipient_name', 'recipient_phone'],
        object: order
    })

    const orderDetails = order.order_orderDetail_relation.map((item) => {
        const { orderDetail_product_relation, product_id, product_size, quantity_buy } = getInfoData({
            fileds: ['orderDetail_product_relation', 'product_id', 'product_size', 'quantity_buy'],
            object: item
        })
        return {
            product_id,
            product_name: orderDetail_product_relation?.product_name || null,
            product_size,
            quantity_buy
        }
    })

    return { ...orderInfo, orderDetails }
}

const convertGetOrdersReturn = (orders) => {
    if (orders.length === 0) return [];

    return orders.map(convertGetOneOrderReturn)
}

module.exports = {
    convertCreateOrderReturn,
    convertGetOrdersReturn,
    convertGetOneOrderReturn
};