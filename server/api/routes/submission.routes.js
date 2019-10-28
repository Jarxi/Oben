const express = require('express');
const { submission } = require('../controllers');
const { authUtil } = require('../utils');
const router = express.Router();


router.use(authUtil.verifyToken);
router.use(authUtil.isLoggedIn);

router.get("/test", (req, res) => res.json({ msg: "submission Works" }));
router.post("/submit", submission.submit);
module.exports = router;
