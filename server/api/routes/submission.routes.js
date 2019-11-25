const express = require('express');
const { submission, counter } = require('../controllers');
const { authUtil } = require('../utils');
const router = express.Router();

router.use(authUtil.verifyToken);
router.use(authUtil.isLoggedIn);

router.get('/test', (req, res) => res.json({ msg: 'submission Works' }));
router.post('/submit', submission.submit);
router.put('/approve', submission.approve);
router.put('/return', submission.reject);
router.get('/getAll', submission.getSubmissions);
router.put('/update', submission.update);

// If you want to create a new counter category, uncomment this
// router.post("/create", counter.createCategory);

module.exports = router;
