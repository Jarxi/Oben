const express = require('express');
const { submission } = require('../controllers');


const router = express.Router();

router.get("/test", (req, res) => res.json({ msg: "submission Works" }));
router.post("/submit", submission.submit);
module.exports = router;
