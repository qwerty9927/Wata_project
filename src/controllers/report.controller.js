const { UnprocessableContentResponse, ErrorResponse } = require("../common/error.response");
const { SuccessResponse } = require("../common/success.response");
const reportService = require("../services/report.service");
const path = require('path');
const fs = require('fs');

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

        const result = await reportService.createReport({ reportDesc, storeId, startDateString, endDateString });
        const baseUrl = req.protocol + '://' + req.get('host') + req.baseUrl;
        result.urlPdfDownload = `${baseUrl}/file/${result.fileName}`;
        delete result.filePath;
        delete result.fileName;

        new SuccessResponse({
            metadata: result,
            code: 201
        }).send({ res });
    }

    async getReportPdfFile(req, res) {
        const fileName = req.params.fileName;
        const file = path.join(__dirname, `../../reports/${fileName}`);

        if (!fs.existsSync(file)) {
            throw new ErrorResponse('File not found!', 404);
        }

        res.download(file, fileName, function (err) {
            if (err) {
                console.error('Error during file download:', err);
                throw new ErrorResponse('Internal server error', 500);
            } else {
                console.log('File download successful');
            }
        });
    }
}

module.exports = new ReportController();