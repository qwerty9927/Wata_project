const { check } = require("express-validator");
const { reportConstant } = require("../constants");
const util = require("util");

const options = {
    desc: { min: 10, max: 500 },
    date: "YYYY-MM-DD"
}

module.exports = {
    validator: () => {
        const msgErr = {
            reportDesc: util.format(reportConstant.REPORT_NOTIFY_VALIDATE.REPORT_DESC, options.desc.min, options.desc.max),
            storeId: reportConstant.REPORT_NOTIFY_VALIDATE.STORE_ID,
            startDateString: util.format(reportConstant.REPORT_NOTIFY_VALIDATE.START_DATE, options.date),
            endDateString: util.format(reportConstant.REPORT_NOTIFY_VALIDATE.END_DATE, options.date)
        }

        return [
            check('storeId').isNumeric().withMessage(msgErr.storeId),
            check('reportDesc').isLength({ min: options.desc.min, max: options.desc.max }).withMessage(msgErr.reportDesc),
            check('startDateString').isDate(options.date).withMessage(msgErr.startDateString),
            check('endDateString').isDate(options.date).withMessage(msgErr.endDateString)
        ]
    }
}