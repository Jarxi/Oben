const express = require('express');
const { user } = require('../controllers');


const router = express.Router();

router.get("/test", (req, res) => res.json({ msg: "user Works" }));
router.post("/signup", user.signUp);
router.post("/signin", user.signIn);
router.post("/resetPassword", user.resetPassword);
module.exports = router;
