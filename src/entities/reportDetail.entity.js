const { EntitySchema } = require("typeorm")
const { reportDetailString, productString, reportString } = require("../constants/entityName.js")

const reportDetailEntity = new EntitySchema({
    name: reportDetailString,
    columns: {
        report_detail_id: {
            type: "int",
            primary: true,
            generated: true
        },
        sale_quantity: {
            type: "tinyint"
        },
        report_id: {
            type: "int"
        },
        product_id: {
            type: "int"
        },
        product_size: {
            type: "varchar"
        }
    },
    relations: {
        reportDetail_report_relation: {
            target: reportString,
            type: "many-to-one",
            joinColumn: {
                name: "report_id",
                referencedColumnName: 'report_id',
            },
            inverseSide: "report_reportDetail_relation"
        },
        reportDetail_product_relation: {
            target: productString,
            type: "many-to-one",
            joinColumn: {
                name: "product_id",
                referencedColumnName: 'product_id',
            },
            inverseSide: "product_reportDetail_relation"
        },
    }
})

module.exports = reportDetailEntity