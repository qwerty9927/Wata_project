const { ErrorResponse } = require("../common/error.response");
const multer = require("multer");

const handleMulterError = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        // console.log({ err });
        if (err.code === 'LIMIT_FILE_SIZE') {
            // File size too large errors
            return next(new ErrorResponse('File size too large, limit 3mb', 413));
        }

        if (err.code === 'FILE_NOT_ALLOWED') {
            // File not allowed
            return next(new ErrorResponse('File types must be png/jpg/gif/jpeg', 415));
        }

        if (err.code === 'LIMIT_UNEXPECTED_FILE') {
            // Limit unexpected file error
            return next(new ErrorResponse('Limit unexpected file', 422));
        }
    }
    next(err);
};

module.exports = handleMulterError;
