const express = require('express');
const { project } = require('../controllers');

const router = express.Router();

router.post("/create", project.create);

module.exports = router;
