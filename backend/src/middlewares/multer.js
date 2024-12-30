const multer = require('multer');

const singleUpload = multer({
  storage: multer.memoryStorage(),
}).single('data');

module.exports = singleUpload;