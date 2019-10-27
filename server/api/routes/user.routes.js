const express = require('express');
const { user } = require('../controllers');
const { authUtil } = require('../utils');

const router = express.Router();

// authorization
router.use(authUtil.verifyToken);
router.use(authUtil.isLoggedIn);


router.get("/test", (req, res) => res.json({ msg: "user Works" }));
router.put("/userInfo", user.updateUserInfo);

module.exports = router;
