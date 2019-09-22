const express = require('express');
const { user } = require('../controllers');


const router = express.Router();

router.get("/test", (req, res) => res.json({ msg: "user Works" }));

module.exports = router;
