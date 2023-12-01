const { getInfoData } = require("../utils");
const config = require("../configs");

const convertGetOneReportReturn = (report) => {
    const reportInfo = getInfoData({
        fileds: ['report_id', 'create_date', 'start_date', 'end_date', 'report_revenue', 'report_total_order',
            'report_desc', 'store_id'],
        object: report
    })

    const reportDetails = report.report_reportDetail_relation.map((item) => {
        const { reportDetail_product_relation, product_size, quantity_buy } = getInfoData({
            fileds: ['reportDetail_product_relation.product_id', 'reportDetail_product_relation.product_name', 'product_size', 'quantity_buy'],
            object: item
        })
        return {
            product_id: reportDetail_product_relation?.product_id || null,
            product_name: reportDetail_product_relation?.product_name || null,
            product_size,
            quantity_buy
        }
    })

    return { ...reportInfo, reportDetails }
}

const convertGetReportsReturn = (reports) => {
    if (reports.length === 0) return [];

    return reports.map(convertGetOneReportReturn)
}

module.exports = {
    convertGetReportsReturn,
    convertGetOneReportReturn
};