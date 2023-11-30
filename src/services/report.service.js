const { ErrorResponse, ConflictResponse } = require("../common/error.response");
const { reportString, storeString, reportDetailString } = require("../constants/entityName");
const { convertGetOneReportReturn, convertGetReportsReturn } = require("../dto/reports.dto");
const { reportConstant } = require("../constants");
const AppDataSource = require("../db/data-source");
const { report } = require("process");

const orderService = require("./order.service");
const PDFReportService = require("./pdfReport.service");

const relationReportReportDetail = 'report_reportDetail_relation';

class ReportService {
    constructor() {
        this.reportRepo = AppDataSource.getRepository(reportString);
        this.reportDetailRepo = AppDataSource.getRepository(reportDetailString);
        this.storeRepo = AppDataSource.getRepository(storeString);
    }

    async findAllReport(page = 1, limit = 10, storeId) {
        const maxLimit = reportConstant.PAGINATION.MAX_LIMIT;

        // Pagination
        page = Math.max(1, parseInt(page)) || 1;
        limit = Math.min(maxLimit, Math.max(0, parseInt(limit)) || maxLimit);
        const skip = (page - 1) * limit;

        const reports = await this.reportRepo.find({ where: { store_id: storeId }, skip, take: limit, relations: [relationReportReportDetail] });
        return convertGetReportsReturn(reports);
    }

    async findOneReport(reportId) {
        const foundReport = await this.reportRepo.findOne({ where: { report_id: reportId }, relations: [relationReportReportDetail] });
        if (!foundReport) {
            throw new ErrorResponse("Report not found!", 404);
        }
        return convertGetOneReportReturn(foundReport);
    }

    async createReport({ reportDesc, storeId, startDateString, endDateString }) {
        // Check store is existing
        const existingStore = await this.storeRepo.findOne({ where: { store_id: storeId } });
        if (!existingStore) {
            throw new ErrorResponse("Store not found!", 404);
        }

        // Assure startDate < endDate
        let startDate = new Date(`${startDateString}T00:00:00`);
        let endDate = new Date(`${endDateString}T23:59:59`);
        if (startDate > endDate) {
            const temp = startDate;
            startDate = endDate;
            endDate = temp;
        }

        // Calculate revenue and quantity order with status payment or done, get list product
        const { totalRevenue, totalOrder, listProductInfo } = await orderService.calculateTotalRevenueAndTotalOrder(storeId, startDate, endDate);

        const report = this.reportRepo.create({
            create_date: new Date(),
            start_date: startDate,
            end_date: endDate,
            report_revenue: totalRevenue,
            report_total_order: totalOrder,
            report_desc: reportDesc,
            store_id: storeId
        })
        const savedReport = await this.reportRepo.save(report);
        const reportDetails = listProductInfo.map(element => ({
            report_id: savedReport.report_id,
            ...element
        }));

        await this.reportDetailRepo.save(reportDetails);

        // Generate PDF and get file name
        const pdfFileName = PDFReportService.generatePDF(savedReport, reportDetails);

        return { report: savedReport, pdfFileName };
    }
}

module.exports = new ReportService();