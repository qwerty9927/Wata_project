const { ErrorResponse } = require("../common/error.response");
const multer = require("multer");

const handleMulterError = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
            // File size too large error
            err = new ErrorResponse('File size too large, limit 3mb', 413);
        }

        if (err.code === 'LIMIT_UNEXPECTED_FILE') {
            // Limit unexpected file error
            err = new ErrorResponse('Limit unexpected file', 422);
        }
    }
    next(err);
};

module.exports = handleMulterError;
