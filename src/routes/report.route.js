const express = require("express");
const router = express.Router();

const asyncHandler = require("../middlewares/async");
const reportControler = require("../controllers/report.controller");
const { reportValidate } = require("../validates/index");

const authentication = require("../middlewares/authentication");
const checkRole = require("../middlewares/checkRole");

router.get('/', asyncHandler(reportControler.getAllReport));

router.get('/:id', asyncHandler(reportControler.getReportById));

router.post('/', reportValidate.validator(), asyncHandler(reportControler.postCreateReport));

module.exports = router