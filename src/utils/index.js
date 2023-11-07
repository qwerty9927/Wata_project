'use strict'

const _ = require('lodash');

const getInfoData = ({ fileds = [], object = {} }) => {
    return _.pick(object, fileds);
}

const makeid = (length) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}

// pizza-pho-mai-p12312342  -> id=12312342
const getIdFromSlugIdProduct = (slugId_product) => {
    const pID = slugId_product.split('-').pop();
    return pID.substring(0, 1) === "p" ? pID.substring(1) : null;
}

module.exports = {
    getInfoData,
    makeid,
    getIdFromSlugIdProduct
}