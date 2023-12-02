module.exports = {
    ORDER_NOTIFY_VALIDATE: {
        ORDER_CODE: 'orderCode: Order code must not be empty and must be a string value',
        ORDER_STATUS: 'orderStatus: Order status must be one of: %s',
        ORDER_ADDRESS: 'orderAddress: Order address must not be empty',
        RECIPIENT_NAME: 'recipientName: Recipient name must not be empty',
        RECIPIENT_PHONE: 'recipientPhone: Recipient phone must not be empty and must be a valid mobile phone number',
        FEE_TRANSPORT: 'feeTransport: Fee transport must not be empty and must be a float value',
        SET_ADDRESS_DEFAULT: 'setAddressDefault: must be a boolean value',
        SET_PHONE_DEFAULT: 'setPhoneDefault: must be a boolean value',
        ORDER_DETAIL: {
            MAIN: "orderDetails: Order detail must be one array",
            PRODUCT_ID: 'productId: Product ID in order detail must not be empty and must be a integer value',
            PRODUCT_SIZE: 'productSize: Product size must be one of: %s',
            QUANTITY_BUY: 'quantityBuy: Quantity buy in order detail must not be empty and must be a integer value',
        }
    },
    ORDER_CONFLICT_MSG: "Order is existed!",
    PAGINATION: {
        MAX_LIMIT: 20
    }
};
