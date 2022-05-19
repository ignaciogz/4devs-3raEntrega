const multer = require('multer');
const path = require('path')

const diskStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/img/profile')
    },
    filename: (req, file, cb) => {
        const extension = path.extname(file.originalname);;
        cb(null, `${req.body.username}${extension}`)
    }
});

const uploadFile = multer({ storage: diskStorage });

module.exports = { uploadFile }