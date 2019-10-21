const express = require('express');
const { counter } = require('../controllers');


const router = express.Router();

router.get("/test", (req, res) => res.json({ msg: "counter Works" }));
router.post("/create", counter.createCategory);
router.post("/increment", counter.increment);

module.exports = router;
