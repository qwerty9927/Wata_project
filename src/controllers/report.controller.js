const { BadRequest, UnprocessableContentResponse } = require("../common/error.response");
const { SuccessResponse } = require("../common/success.response");
const reportService = require("../services/report.service");

const { validationResult } = require("express-validator");

// reportDesc, storeId, startDateString, endDateString
class ReportController {
    async getAllReport(req, res, next) {
        const { storeId, page, limit } = req.query;

        const reports = await reportService.findAllReport(page, limit, storeId)

        new SuccessResponse({
            metadata: reports,
        }).send({ res });
    }

    async getReportById(req, res, next) {
        const report = await reportService.findOneReport(req.params.id);

        new SuccessResponse({
            metadata: report,
        }).send({ res });
    }

    async postCreateReport(req, res, next) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            // Convert validation errors to an array of error messages
            const errorMessages = errors.array().map((error) => error.msg);
            throw new UnprocessableContentResponse(errorMessages);
        }

        const { reportDesc, storeId, startDateString, endDateString } = req.body;

        new SuccessResponse({
            metadata: await reportService.createReport({ reportDesc, storeId, startDateString, endDateString }),
            code: 201
        }).send({ res });

    }
}

module.exports = new ReportController();