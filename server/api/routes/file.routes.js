const express = require('express');
const { upload, conn } = require('../../db');
const { file } = require('../controllers');
const { authUtil } = require('../utils');

const router = express.Router();

// authentication
router.use(authUtil.verifyToken);
router.use(authUtil.isLoggedIn);

router.post('/upload', upload.single('file'), (req, res) => {
    res.json({ file: req.file });
});

// @route GET /files/:filename
// @desc  Display single file object
router.get('/files', file.getFile);

module.exports = router;
