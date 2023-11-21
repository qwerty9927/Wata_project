module.exports = {
    ORDER_NOTIFY_VALIDATE: {
        ORDER_CODE: 'Order code must not be empty and must be a string value',
        ORDER_STATUS: 'Order status must be one of: %s',
        ORDER_ADDRESS: 'Order address must not be empty',
        RECIPIENT_NAME: 'Recipient name must not be empty',
        RECIPIENT_PHONE: 'Recipient phone must not be empty and must be a valid mobile phone number',
        FEE_TRANSPORT: 'Fee transport must not be empty and must be a float value',
        ORDER_DETAIL: {
            MAIN: "Order detail must be one array",
            PRODUCT_ID: 'Product ID in order detail must not be empty and must be a integer value',
            PRODUCT_SIZE: 'Product size must be one of: %s',
            QUANTITY_BUY: 'Quantity buy in order detail must not be empty and must be a integer value',
        }
    },
    ORDER_CONFLICT_MSG: "Order is existed!"
};
