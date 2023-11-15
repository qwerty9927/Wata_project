const { getInfoData } = require("../utils");

const convertProduct = (product) => {
    if (!product) return null;

    const productInfo = getInfoData({
        fileds: ['product_id', 'product_name', 'product_slug', 'product_image', 'product_desc', 'category'],
        object: product
    });

    const sizes = product?.productPrice.map((price) => ({
        size_name: price?.productSize?.size_name || '',
        product_price: price?.product_price || '',
    })) || [];

    return {
        ...productInfo,
        sizes,
    };
};

const convertProducts = (products = []) => {
    if (products.length === 0) return [];

    return products.map(convertProduct);
};

module.exports = {
    convertProduct,
    convertProducts,
};
