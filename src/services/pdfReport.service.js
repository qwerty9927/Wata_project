const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

class PDFReportService {
    static generatePDF(report, listProductInfo, savePath = "./reports") {
        if (!fs.existsSync(savePath)) {
            fs.mkdirSync(savePath, { recursive: true });
        }

        const fileName = `report_${report.report_id}.pdf`;
        const filePath = path.resolve(savePath, fileName);
        const doc = new PDFDocument();

        // Set PDF file name and headers
        doc.pipe(fs.createWriteStream(filePath));
        doc.fontSize(20).text("Report Store", { align: "center" }).moveDown(0.5);

        // Add report details to PDF
        doc.fontSize(12);
        doc.text(`Report ID: ${report.report_id}`);
        doc.text(`Create Date: ${report.create_date}`);
        doc.text(`Start Date: ${report.start_date}`);
        doc.text(`End Date: ${report.end_date}`);
        doc.text(`Report Revenue: $${report.report_revenue.toFixed(2)}`);
        doc.text(`Report Total Order: ${report.report_total_order}`);
        doc.text(`Store ID: ${report.store_id}`);
        doc.text(`Report Description: ${report.report_desc}`);
        doc.moveDown();

        // Add report details array
        doc.fontSize(14).text("Report Details:", { underline: true }).moveDown(0.5);
        listProductInfo.forEach((detail) => {
            doc.fontSize(12);
            doc.text(`Product ID: ${detail.product_id}`);
            doc.text(`Product Name: ${detail.product_name}`);
            doc.text(`Product Size: ${detail.product_size}`);
            doc.text(`Quantity Buy: ${detail.quantity_buy}`);
            doc.moveDown(0.5);
        });

        // Add a page footer with the current page number
        doc.fontSize(10).text(`Page ${doc.page.number}`, 10, doc.page.height - 20, { align: 'right' });

        // Finalize PDF
        doc.end();

        return filePath;
    }
}

module.exports = PDFReportService;
