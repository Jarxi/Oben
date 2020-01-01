const express = require('express');
const { project } = require('../controllers');
const { authUtil } = require('../utils');
const router = express.Router();


router.use(authUtil.verifyToken);
router.use(authUtil.isLoggedIn);

router.post("/create", project.create);
router.get("/projects", project.getProjects);
router.delete("/", project.deleteProject);
module.exports = router;

