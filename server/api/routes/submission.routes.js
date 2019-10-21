const express = require('express');
const { submission } = require('../controllers');


const router = express.Router();

router.get("/test", (req, res) => res.json({ msg: "submission Works" }));

module.exports = router;
