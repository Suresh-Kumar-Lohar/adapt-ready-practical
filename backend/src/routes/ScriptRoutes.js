const express = require('express');
const router = express.Router();
const singleUpload = require('../middlewares/multer');
const ScriptController = require('../controllers/ScriptController');

router.post('/seed-data', singleUpload, ScriptController.importData);

module.exports = router;
