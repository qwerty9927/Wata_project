const { getInfoData } = require("../utils");
const config = require("../configs");

const convertGetOneReportReturn = (report) => {
    const reportInfo = getInfoData({
        fileds: ['report_id', 'create_date', 'start_date', 'end_date', 'report_revenue', 'report_total_order',
            'report_desc', 'store_id'],
        object: report
    })

    const reportDetails = report.report_reportDetail_relation.map((item) => {
        return getInfoData({
            fileds: ['product_id', 'product_size', 'quantity_buy'],
            object: item
        })
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