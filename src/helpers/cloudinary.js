const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const path = require('path');
const config = require("../configs");
const { ErrorResponse } = require('../common/error.response');

cloudinary.config({
    cloud_name: config.cloudinary.name,
    api_key: config.cloudinary.key,
    api_secret: config.cloudinary.secret
});

// Func upload file
const uploadFileToCloud = (field, main, fileSizeMb = 3, fileExtention = ['png', 'jpg', 'gif', 'jpeg']) => {
    const storage = new CloudinaryStorage({
        cloudinary: cloudinary,
        allowedFormats: fileExtention,
        params: {
            folder: `pizzaTop/${main}`,
            public_id: (req, file) => {
                return `${file.fieldname}_${Date.now()}_${file.originalname.replace(/(.png|.jpg|.gif|.jpeg)/gi, '')}`;
            }
        }
    });

    const upload = multer({
        storage: storage,
        limits: {
            fileSize: fileSizeMb * 1024 * 1024
        },
        fileFilter: (req, file, cb) => {
            const fileTypes = new RegExp('png|jpg|gif|jpeg');
            const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
            const mimeType = fileTypes.test(file.mimetype);

            // console.log({ fileTypes, extName, mimeType });
            // console.log({ reqBody: req.body, reqFile: file });

            if (!(mimeType && extName)) {
                return cb(new multer.MulterError('FILE_NOT_ALLOWED'), false);
            }
            return cb(null, true);
        }
    });

    return upload.single(field);
};

// Func remove file from Cloudinary
const removeFileOnCloud = async (public_id) => {
    try {
        const result = await cloudinary.uploader.destroy(public_id);
        console.log('Remove file result:', result);
        return true;
    } catch (error) {
        console.error('Error removing file from Cloudinary:', error);
        return false;
    }
};

module.exports = {
    uploadFileToCloud,
    removeFileOnCloud
};
