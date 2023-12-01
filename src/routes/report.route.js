const express = require("express");
const router = express.Router();

const asyncHandler = require("../middlewares/async");
const reportControler = require("../controllers/report.controller");
const { reportValidate } = require("../validates/index");

const authentication = require("../middlewares/authentication");
const checkRole = require("../middlewares/checkRole");

router.get('/', authentication, checkRole(["Admin"]), asyncHandler(reportControler.getAllReport));

router.get('/:id', authentication, checkRole(["Admin"]), asyncHandler(reportControler.getReportById));

router.post('/', authentication, checkRole(["Staff", "Admin"]), reportValidate.validator(), asyncHandler(reportControler.postCreateReport));

module.exports = router